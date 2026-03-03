'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getNotifications } from '@/services/notifications/notification.service';
import type { NotificationItem, NotificationListResponse } from '@/services/notifications/notification.types';

const LAST_SEEN_AT_KEY = 'mspk_notifications_last_seen_at_v1';
const SEEN_IDS_KEY = 'mspk_notifications_seen_ids_v1';
const MAX_SEEN_IDS = 200;

function normalizeNotifications(data: NotificationListResponse | NotificationItem[] | undefined) {
  const items = Array.isArray(data) ? data : data?.results ?? [];
  return items.filter(Boolean);
}

function readLastSeenAt(): number | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(LAST_SEEN_AT_KEY);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function writeLastSeenAt(value: number) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LAST_SEEN_AT_KEY, String(value));
}

function readSeenIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(SEEN_IDS_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => typeof id === 'string'));
  } catch {
    return new Set();
  }
}

function writeSeenIds(ids: Set<string>) {
  if (typeof window === 'undefined') return;
  const list = Array.from(ids);
  const trimmed = list.slice(Math.max(list.length - MAX_SEEN_IDS, 0));
  window.localStorage.setItem(SEEN_IDS_KEY, JSON.stringify(trimmed));
}

function getCreatedAtMs(item: NotificationItem): number | null {
  if (!item?.createdAt) return null;
  const parsed = Date.parse(item.createdAt);
  return Number.isFinite(parsed) ? parsed : null;
}

export function NotificationsWatcher() {
  const { data } = useQuery({
    queryKey: ['notifications', 'watcher'],
    queryFn: getNotifications,
    refetchInterval: 15000,
  });

  const seenIdsRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  useEffect(() => {
    const items = normalizeNotifications(data);
    if (items.length === 0) return;

    if (!initializedRef.current) {
      seenIdsRef.current = readSeenIds();
      let maxCreatedAt: number | null = readLastSeenAt();

      items.forEach((item) => {
        if (item?._id) {
          seenIdsRef.current.add(item._id);
        }
        const createdAt = item ? getCreatedAtMs(item) : null;
        if (createdAt && (!maxCreatedAt || createdAt > maxCreatedAt)) {
          maxCreatedAt = createdAt;
        }
      });

      if (maxCreatedAt) {
        writeLastSeenAt(maxCreatedAt);
      }
      writeSeenIds(seenIdsRef.current);
      initializedRef.current = true;
      return;
    }

    const lastSeenAt = readLastSeenAt();
    const newItems = items.filter((item) => item?._id && !seenIdsRef.current.has(item._id));

    newItems.forEach((item) => {
      if (!item?._id) return;
      const createdAt = getCreatedAtMs(item);
      if (createdAt && lastSeenAt && createdAt <= lastSeenAt) {
        seenIdsRef.current.add(item._id);
        return;
      }

      seenIdsRef.current.add(item._id);

      const title = item.title || 'New Notification';
      const body = item.message || item.body || '';

      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/logo.jpg' });
      } else {
        toast(title, { description: body });
      }
    });

    let maxCreatedAt = lastSeenAt ?? null;
    items.forEach((item) => {
      const createdAt = item ? getCreatedAtMs(item) : null;
      if (createdAt && (!maxCreatedAt || createdAt > maxCreatedAt)) {
        maxCreatedAt = createdAt;
      }
    });
    if (maxCreatedAt) {
      writeLastSeenAt(maxCreatedAt);
    }
    writeSeenIds(seenIdsRef.current);
  }, [data]);

  return null;
}
