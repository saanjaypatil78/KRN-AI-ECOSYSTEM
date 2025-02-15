export interface Agent {
  id: string;
  name: string;
  status: "active" | "idle" | "offline";
  type: string;
  capabilities: string[];
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  priority?: number;
  dependencies?: string[];
}

export interface SystemMetrics {
  agentInteractions: number;
  taskCompletion: number;
  resourceUsage: number;
  storageUsed: number;
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
}

export interface GraphNode {
  id: string;
  label: string;
  type: string;
  position: { x: number; y: number };
  data?: any;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
  type?: string;
}
