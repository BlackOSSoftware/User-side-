"use client";

import { useBotStatusQuery } from "@/services/bot/bot.hooks";
import { Card, CardContent } from "@/components/ui/card";

export default function BotStatusPage() {
  const { data, isLoading } = useBotStatusQuery();

  return (
    <div className="flex-1 space-y-6 py-2">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Bot Status</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">Live status of execution automation.</p>
      </div>

      <Card className="border-border/60 bg-white/80 dark:bg-white/5 rounded-[1.5rem]">
        <CardContent className="p-6 text-sm text-muted-foreground">
          {isLoading ? "Checking status..." : `Status: ${data?.status || "Unknown"}`}
        </CardContent>
      </Card>
    </div>
  );
}
