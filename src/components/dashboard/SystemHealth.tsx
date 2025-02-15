import React from "react";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { AlertCircle, DollarSign, HardDrive, Cpu } from "lucide-react";

interface SystemHealthProps {
  metrics?: {
    cpuUsage: number;
    memoryUsage: number;
    budget: {
      used: number;
      total: number;
    };
    storage: {
      used: number;
      total: number;
    };
  };
}

const SystemHealth = ({
  metrics = {
    cpuUsage: 45,
    memoryUsage: 60,
    budget: {
      used: 750,
      total: 1000,
    },
    storage: {
      used: 128,
      total: 512,
    },
  },
}: SystemHealthProps) => {
  return (
    <div className="bg-background p-6 rounded-lg w-full h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">System Health</h2>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-muted-foreground">
              All systems operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">CPU Usage</h3>
              </div>
              <span className="text-2xl font-bold">{metrics.cpuUsage}%</span>
            </div>
            <Progress value={metrics.cpuUsage} className="h-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-purple-500" />
                <h3 className="font-medium">Memory Usage</h3>
              </div>
              <span className="text-2xl font-bold">{metrics.memoryUsage}%</span>
            </div>
            <Progress value={metrics.memoryUsage} className="h-2" />
          </Card>
        </div>

        <Separator />

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3 className="font-medium">Budget Tracking</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                ${metrics.budget.used} / ${metrics.budget.total}
              </span>
            </div>
            <Progress
              value={(metrics.budget.used / metrics.budget.total) * 100}
              className="h-2"
            />
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <HardDrive className="h-5 w-5 text-yellow-500" />
                <h3 className="font-medium">Storage Usage</h3>
              </div>
              <span className="text-sm text-muted-foreground">
                {metrics.storage.used}GB / {metrics.storage.total}GB
              </span>
            </div>
            <Progress
              value={(metrics.storage.used / metrics.storage.total) * 100}
              className="h-2"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
