import { create } from "zustand";
import { Agent, Task, SystemMetrics } from "./types";

interface KRNStore {
  agents: Agent[];
  tasks: Task[];
  metrics: SystemMetrics;
  addAgent: (agent: Omit<Agent, "id">) => void;
  removeAgent: (id: string) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  updateMetrics: (updates: Partial<SystemMetrics>) => void;
}

export const useKRNStore = create<KRNStore>((set) => ({
  agents: [],
  tasks: [],
  metrics: {
    agentInteractions: 0,
    taskCompletion: 0,
    resourceUsage: 0,
    storageUsed: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    budget: {
      used: 0,
      total: 30, // $30/year budget
    },
    storage: {
      used: 0,
      total: 5, // 5GB free tier limit
    },
  },
  addAgent: (agent) =>
    set((state) => ({
      agents: [...state.agents, { ...agent, id: crypto.randomUUID() }],
    })),
  removeAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((a) => a.id !== id),
    })),
  updateAgent: (id, updates) =>
    set((state) => ({
      agents: state.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  updateMetrics: (updates) =>
    set((state) => ({
      metrics: { ...state.metrics, ...updates },
    })),
}));
