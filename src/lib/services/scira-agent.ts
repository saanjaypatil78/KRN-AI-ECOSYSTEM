import { Redis } from "@upstash/redis";
import { Agent, Task } from "../types";

const BUFFER_SIZE = 5 * 1024 * 1024; // 5MB per session
const MAX_SESSIONS = 50;

export class SciraAgent {
  private redis: Redis;
  private sessionCounter: number = 0;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL || "",
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    });
  }

  async initSession() {
    const sessionId = `session:${Date.now()}`;
    if (this.sessionCounter >= MAX_SESSIONS) {
      // Remove oldest session
      const sessions = await this.redis.keys("session:*");
      if (sessions.length > 0) {
        await this.redis.del(sessions[0]);
      }
    } else {
      this.sessionCounter++;
    }
    return sessionId;
  }

  async processTask(task: Task, context: any) {
    const sessionId = await this.initSession();
    try {
      // Store context in Redis with size limit
      const contextString = JSON.stringify(context);
      if (contextString.length <= BUFFER_SIZE) {
        await this.redis.set(sessionId, contextString, { ex: 3600 }); // 1 hour expiry
      }

      // Process task using SCIRA
      const result = await this.executeSciraWorkflow(task, sessionId);
      return result;
    } catch (error) {
      console.error("SCIRA processing error:", error);
      throw error;
    }
  }

  private async executeSciraWorkflow(task: Task, sessionId: string) {
    // Implement SCIRA workflow here
    // This would interact with the Python SCIRA backend
    return {
      status: "completed",
      result: `Processed ${task.title} with SCIRA`,
    };
  }

  async cleanupSession(sessionId: string) {
    await this.redis.del(sessionId);
    this.sessionCounter--;
  }
}

export const sciraAgent = new SciraAgent();
