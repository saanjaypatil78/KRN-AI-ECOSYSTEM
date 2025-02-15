import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus, Trash2, Settings, Send } from "lucide-react";

import { Agent, Task } from "@/lib/types";
import { useKRNStore } from "@/lib/store";

interface ControlPanelProps {
  agents?: Agent[];
  tasks?: Task[];
  onCreateAgent?: (agent: Omit<Agent, "id">) => void;
  onDeleteAgent?: (id: string) => void;
  onAssignTask?: (task: Omit<Task, "id">) => void;
  onUpdateConfig?: (config: Record<string, any>) => void;
}

const ControlPanel = () => {
  const { agents, tasks, addAgent, removeAgent, addTask } = useKRNStore();
  const [newAgentName, setNewAgentName] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);

  return (
    <Card className="p-6 bg-background w-full h-full">
      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">AI Agents</h3>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Agent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Agent</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input
                      id="agentName"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                      placeholder="Enter agent name"
                    />
                  </div>
                  <Button
                    onClick={() => {
                      addAgent({
                        name: newAgentName,
                        status: "idle",
                        type: "basic",
                        capabilities: [],
                      });
                      setNewAgentName("");
                      setIsCreateDialogOpen(false);
                    }}
                  >
                    Create Agent
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Status: {agent.status}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeAgent(agent.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Task Assignment</h3>
            <div className="space-y-2">
              <Label htmlFor="taskTitle">Task Title</Label>
              <Input
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assignTo">Assign To</Label>
              <select
                id="assignTo"
                className="w-full p-2 border rounded-md"
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
              >
                <option value="">Select an agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={() => {
                addTask({
                  title: newTaskTitle,
                  assignedTo: selectedAgent,
                  status: "pending",
                });
                setNewTaskTitle("");
                setSelectedAgent("");
              }}
            >
              <Send className="mr-2 h-4 w-4" />
              Assign Task
            </Button>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-4">Current Tasks</h4>
            <div className="grid gap-4">
              {tasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-medium">{task.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        Assigned to:{" "}
                        {agents.find((a) => a.id === task.assignedTo)?.name}
                      </p>
                    </div>
                    <span className="text-sm">{task.status}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Swarm Configuration</h3>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Update Config
            </Button>
          </div>
          <Card className="p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxAgents">Maximum Agents</Label>
                <Input type="number" id="maxAgents" defaultValue="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taskTimeout">Task Timeout (seconds)</Label>
                <Input type="number" id="taskTimeout" defaultValue="300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resourceLimit">Resource Limit</Label>
                <Input type="number" id="resourceLimit" defaultValue="1000" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ControlPanel;
