'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getNotifications } from '@/services/notifications/notification.service';
import type { NotificationItem, NotificationListResponse } from '@/services/notifications/notification.types';

function normalizeNotifications(data: NotificationListResponse | NotificationItem[] | undefined) {
  const items = Array.isArray(data) ? data : data?.results ?? [];
  return items.filter(Boolean);
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

    if (!initializedRef.current) {
      items.forEach((item) => {
        if (item?._id) {
          seenIdsRef.current.add(item._id);
        }
      });
      initializedRef.current = true;
      return;
    }

    const newItems = items.filter((item) => item?._id && !seenIdsRef.current.has(item._id));

    newItems.forEach((item) => {
      if (!item?._id) return;
      seenIdsRef.current.add(item._id);

      const title = item.title || 'New Notification';
      const body = item.message || item.body || '';

      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/logo.jpg' });
      } else {
        toast(title, { description: body });
      }
    });
  }, [data]);

  return null;
}
