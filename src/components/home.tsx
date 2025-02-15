import React from "react";
import Sidebar from "./Sidebar";
import MainMetrics from "./dashboard/MainMetrics";
import ControlPanel from "./dashboard/ControlPanel";
import SystemHealth from "./dashboard/SystemHealth";
import LangGraphVisualizer from "./dashboard/LangGraphVisualizer";
import { useKRNStore } from "@/lib/store";

const Home = () => {
  const metrics = useKRNStore((state) => state.metrics);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">AI Ecosystem Dashboard</h1>

        <MainMetrics
          metrics={{
            agentInteractions: metrics.agentInteractions,
            taskCompletion: metrics.taskCompletion,
            resourceUsage: metrics.resourceUsage,
            storageUsed: metrics.storageUsed,
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ControlPanel />
          <SystemHealth
            metrics={{
              cpuUsage: metrics.cpuUsage,
              memoryUsage: metrics.memoryUsage,
              budget: metrics.budget,
              storage: metrics.storage,
            }}
          />
        </div>

        <LangGraphVisualizer />
      </main>
    </div>
  );
};

export default Home;
