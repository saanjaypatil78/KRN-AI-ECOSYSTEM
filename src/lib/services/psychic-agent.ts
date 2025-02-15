import { Redis } from "@upstash/redis";
import { Agent, Task } from "../types";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export class PsychicAgent {
  private static instance: PsychicAgent;
  private agentCache: Map<string, Agent>;

  private constructor() {
    this.agentCache = new Map();
  }

  static getInstance(): PsychicAgent {
    if (!PsychicAgent.instance) {
      PsychicAgent.instance = new PsychicAgent();
    }
    return PsychicAgent.instance;
  }

  async analyzeTaskComplexity(task: Task): Promise<number> {
    // Simplified complexity analysis
    const complexityFactors = {
      hasDependencies: task.dependencies.length > 0 ? 1 : 0,
      priority: task.priority / 10,
      titleLength: task.title.length / 100,
    };
    return Object.values(complexityFactors).reduce((a, b) => a + b, 0);
  }

  async createAgent(complexity: number): Promise<Agent> {
    const agentType =
      complexity > 0.7
        ? "advanced"
        : complexity > 0.3
          ? "intermediate"
          : "basic";

    const agent: Agent = {
      id: crypto.randomUUID(),
      name: `Agent-${agentType}-${Date.now()}`,
      status: "idle",
      type: agentType,
      capabilities: this.getCapabilitiesForType(agentType),
    };

    // Cache agent in Redis with 1 hour expiration
    await redis.set(`agent:${agent.id}`, JSON.stringify(agent), { ex: 3600 });
    this.agentCache.set(agent.id, agent);

    return agent;
  }

  private getCapabilitiesForType(type: string): string[] {
    switch (type) {
      case "advanced":
        return ["complex-tasks", "learning", "optimization", "delegation"];
      case "intermediate":
        return ["standard-tasks", "learning", "collaboration"];
      default:
        return ["basic-tasks", "collaboration"];
    }
  }

  async selfImprove(agent: Agent): Promise<Agent> {
    // HABITAT 3.0 self-improvement logic
    const performance = await this.getAgentPerformance(agent.id);
    if (performance > 0.8 && agent.type !== "advanced") {
      const improvedAgent = {
        ...agent,
        type: agent.type === "basic" ? "intermediate" : "advanced",
        capabilities: this.getCapabilitiesForType(
          agent.type === "basic" ? "intermediate" : "advanced",
        ),
      };
      await redis.set(`agent:${agent.id}`, JSON.stringify(improvedAgent));
      this.agentCache.set(agent.id, improvedAgent);
      return improvedAgent;
    }
    return agent;
  }

  private async getAgentPerformance(agentId: string): Promise<number> {
    // Simplified performance calculation
    return Math.random(); // Replace with actual performance metrics
  }
}

export const psychicAgent = PsychicAgent.getInstance();
