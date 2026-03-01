"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCreateWatchlistMutation,
  useDeleteWatchlistMutation,
  useToggleWatchlistMutation,
  useWatchlistsQuery,
} from "@/services/watchlist/watchlist.hooks";
import { BellRing, Bookmark, Plus, Sparkles, Trash2 } from "lucide-react";

export default function WatchlistPage() {
  const { data: watchlists = [], isLoading } = useWatchlistsQuery();
  const createMutation = useCreateWatchlistMutation();
  const deleteMutation = useDeleteWatchlistMutation();
  const toggleMutation = useToggleWatchlistMutation();
  const [newName, setNewName] = useState("");
  const [signalIdMap, setSignalIdMap] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  const stats = useMemo(() => {
    const totalSignals = watchlists.reduce((sum, item) => sum + (item.signals?.length ?? 0), 0);
    const defaults = watchlists.filter((item) => item.isDefault).length;
    return { totalSignals, defaults };
  }, [watchlists]);

  const getErrorMessage = (error: unknown, fallback: string) => {
    const apiMessage =
      typeof (error as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.message === "string"
        ? String((error as { response?: { data?: { message?: string } } })?.response?.data?.message)
        : typeof (error as { response?: { data?: { message?: string; error?: string } } })?.response?.data?.error === "string"
          ? String((error as { response?: { data?: { error?: string } } })?.response?.data?.error)
          : undefined;
    return apiMessage || (error instanceof Error ? error.message : fallback);
  };

  async function handleCreate() {
    setFormError("");
    if (!newName.trim()) {
      setFormError("Enter a watchlist name.");
      return;
    }
    try {
      await createMutation.mutateAsync({ name: newName.trim() });
      setNewName("");
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to create watchlist."));
    }
  }

  async function handleToggle(id: string) {
    const signalId = signalIdMap[id]?.trim();
    if (!signalId) {
      setFormError("Enter a signal ID to toggle.");
      return;
    }
    try {
      await toggleMutation.mutateAsync({ id, payload: { signalId } });
      setSignalIdMap((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to toggle signal."));
    }
  }

  return (
    <div className="py-2 space-y-6 sm:space-y-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-gradient-to-br from-background via-background to-primary/10 p-6 sm:p-8">
        <div className="absolute -right-24 -top-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-24 -bottom-20 h-48 w-48 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Curated Signals
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Watchlist Control Center
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Build focused lists for segments, strategies, or execution zones. Toggle signals in and out instantly.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-border/40 bg-background/70 px-4 py-3 text-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Watchlists</div>
              <div className="text-lg font-semibold text-foreground">{watchlists.length}</div>
            </div>
            <div className="rounded-2xl border border-border/40 bg-background/70 px-4 py-3 text-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Signals Tracked</div>
              <div className="text-lg font-semibold text-foreground">{stats.totalSignals}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Create Watchlist</h2>
              <p className="text-sm text-muted-foreground">Name your list and keep signals organized.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Morning Breakouts"
                className="h-11 flex-1 rounded-xl border border-border/60 bg-background px-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="h-11 rounded-xl" onClick={handleCreate} disabled={createMutation.isPending}>
                <Plus className="mr-2 h-4 w-4" />
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </div>

            {formError ? (
              <div className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-xs text-rose-700 dark:text-rose-100">
                {formError}
              </div>
            ) : null}

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bookmark className="h-4 w-4 text-primary" />
              {stats.defaults > 0 ? `${stats.defaults} default list(s) active.` : "No default watchlist yet."}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-gradient-to-br from-primary/10 via-background to-background rounded-[1.5rem]">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Live Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Keep this space for high-priority signal alerts mapped to your watchlists.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-background/80 p-4 text-sm text-muted-foreground">
              <BellRing className="mb-2 h-5 w-5 text-primary" />
              Alerts will appear here once your watchlists receive signal updates.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Your Watchlists</h2>
            <p className="text-sm text-muted-foreground">Toggle signals or remove lists as needed.</p>
          </div>
        </div>

        {isLoading ? (
          <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
            <CardContent className="p-6 text-sm text-muted-foreground">Loading watchlists...</CardContent>
          </Card>
        ) : watchlists.length === 0 ? (
          <Card className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              No watchlists found. Create your first list to start tracking signals.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {watchlists.map((item) => (
              <Card key={item._id} className="border-border/60 bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-[1.5rem]">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {item.isDefault ? "Default watchlist" : "Custom list"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteMutation.mutate(item._id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-muted/40 px-4 py-3 text-xs">
                    <span className="text-muted-foreground">Signals tracked</span>
                    <span className="text-sm font-semibold text-foreground">{item.signals?.length ?? 0}</span>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Toggle signal</label>
                    <div className="flex gap-2">
                      <input
                        value={signalIdMap[item._id] ?? ""}
                        onChange={(e) => setSignalIdMap((prev) => ({ ...prev, [item._id]: e.target.value }))}
                        placeholder="Signal ID"
                        className="h-10 flex-1 rounded-xl border border-border/60 bg-background px-3 text-xs text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <Button
                        className="h-10 rounded-xl"
                        onClick={() => handleToggle(item._id)}
                        disabled={toggleMutation.isPending}
                      >
                        Toggle
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
