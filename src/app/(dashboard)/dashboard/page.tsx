"use client";

import { VisualStatCard } from "@/components/dashboard/visual-stat-card";
import { UserPerformanceGraph } from "@/components/dashboard/user-performance-graph";
import { RecentDealsTable } from "@/components/dashboard/recent-deals-table";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
    const dummyChartData = [
        { value: 10 }, { value: 40 }, { value: 20 }, { value: 60 }, { value: 30 }, { value: 80 }, { value: 50 }
    ];

    return (
        <div className="space-y-4 flex flex-col h-auto lg:h-full lg:overflow-hidden pb-4 lg:pb-0">
            {/* Top Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-auto lg:h-36 shrink-0">
                <VisualStatCard
                    title="Strategy P/L"
                    value="₹1,24,500"
                    change="+15.2%"
                    type="area"
                    color="#10b981"
                    subtext="All Strategies"
                    data={dummyChartData}
                />
                <VisualStatCard
                    title="Active Strategies"
                    value="4"
                    change="Running"
                    type="radial"
                    color="#3b82f6"
                    subtext="Cloud Execution"
                />
                <VisualStatCard
                    title="Notifications"
                    value="128"
                    change="+24 Today"
                    type="bar"
                    color="#f59e0b"
                    subtext="Sent via Web/App"
                    data={[{ value: 20 }, { value: 50 }, { value: 30 }, { value: 80 }, { value: 128 }]}
                />
                <VisualStatCard
                    title="Data Latency"
                    value="42ms"
                    change="Optimal"
                    type="area"
                    color="#8b5cf6"
                    subtext="Tick-to-Trade"
                />
            </div>

            {/* Main Content Grid - Exact Admin Replica Layout */}
            <div className="flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3 lg:pb-2">
                {/* Left Column: Graph & Orders (9/12) */}
                <div className="lg:col-span-9 flex flex-col gap-3 h-auto lg:h-full lg:min-h-0">
                    {/* Performance Graph */}
                    <div className="h-72 lg:h-auto lg:flex-1 lg:min-h-0">
                        <UserPerformanceGraph />
                    </div>
                    {/* Recent Signals Table */}
                    <div className="h-64 lg:h-56 shrink-0">
                        <RecentDealsTable />
                    </div>
                </div>

                {/* Right Column: Activity & Quick Actions (3/12) */}
                <div className="lg:col-span-3 flex flex-col gap-3 h-auto lg:h-full lg:min-h-0">
                    {/* Activity Log */}
                    <div className="h-80 lg:h-auto lg:flex-1 lg:min-h-0 rounded-2xl overflow-hidden">
                        <ActivityTimeline />
                    </div>
                    {/* Quick Actions */}
                    <div className="h-auto lg:h-48 shrink-0">
                        <QuickActions />
                    </div>
                </div>
            </div>
        </div>
    );
}
