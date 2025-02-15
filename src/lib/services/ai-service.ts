import { Agent, Task } from "../types";
import { psychicAgent } from "./psychic-agent";

export class AIService {
  async assignTask(task: Task, agents: Agent[]) {
    const complexity = await psychicAgent.analyzeTaskComplexity(task);

    // Create new agent if needed based on complexity
    if (agents.length === 0 || complexity > 0.7) {
      const newAgent = await psychicAgent.createAgent(complexity);
      agents.push(newAgent);
    }

    const availableAgents = agents.filter((a) => a.status === "idle");
    if (availableAgents.length === 0) return null;

    // Find best matching agent based on capabilities and task complexity
    const bestAgent = availableAgents.reduce((best, current) => {
      const score =
        current.capabilities.length * (current.type === "advanced" ? 2 : 1);
      return score >
        (best
          ? best.capabilities.length * (best.type === "advanced" ? 2 : 1)
          : 0)
        ? current
        : best;
    });

    // Trigger self-improvement
    await psychicAgent.selfImprove(bestAgent);

    return bestAgent.id;
  }

  async optimizeResources(agents: Agent[], tasks: Task[]) {
    const totalAgents = agents.length;
    const activeAgents = agents.filter((a) => a.status === "active").length;

    return {
      cpuUsage: (activeAgents / totalAgents) * 100,
      memoryUsage: (tasks.length / (totalAgents * 3)) * 100,
      resourceEfficiency: 1 - activeAgents / totalAgents,
    };
  }
}

export const aiService = new AIService();
