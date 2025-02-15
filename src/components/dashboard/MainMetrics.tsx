import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Brain,
  Cpu,
  Database,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  Icon: React.ElementType;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  change = 0,
  Icon = Users,
}: MetricCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-background border-border">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
        </div>
        <div className="p-2 bg-secondary rounded-full">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center mt-4 space-x-2">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
        >
          {Math.abs(change)}%
        </span>
      </div>
      <Progress value={75} className="mt-4" />
    </Card>
  );
};

interface MainMetricsProps {
  metrics?: {
    agentInteractions: number;
    taskCompletion: number;
    resourceUsage: number;
    storageUsed: number;
  };
}

const MainMetrics = ({
  metrics = {
    agentInteractions: 1234,
    taskCompletion: 85,
    resourceUsage: 65,
    storageUsed: 42,
  },
}: MainMetricsProps) => {
  return (
    <div className="w-full h-[300px] p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Agent Interactions"
          value={metrics.agentInteractions.toLocaleString()}
          change={12}
          Icon={Users}
        />
        <MetricCard
          title="Task Completion Rate"
          value={`${metrics.taskCompletion}%`}
          change={-5}
          Icon={Brain}
        />
        <MetricCard
          title="Resource Usage"
          value={`${metrics.resourceUsage}%`}
          change={8}
          Icon={Cpu}
        />
        <MetricCard
          title="Storage Used"
          value={`${metrics.storageUsed}GB`}
          change={3}
          Icon={Database}
        />
      </div>
    </div>
  );
};

export default MainMetrics;
