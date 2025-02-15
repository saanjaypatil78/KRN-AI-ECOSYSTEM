import React, { useCallback } from "react";
import { Card } from "@/components/ui/card";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { GraphNode, GraphEdge } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Minus, ZoomIn, ZoomOut, Move } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: string;
  position: { x: number; y: number };
}

interface Edge {
  source: string;
  target: string;
  label?: string;
}

interface LangGraphVisualizerProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edge: Edge) => void;
}

const defaultNodes: Node[] = [
  {
    id: "1",
    label: "Task Parser",
    type: "input",
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    label: "Language Model",
    type: "process",
    position: { x: 300, y: 100 },
  },
  {
    id: "3",
    label: "Output Generator",
    type: "output",
    position: { x: 500, y: 100 },
  },
];

const defaultEdges: Edge[] = [
  { source: "1", target: "2", label: "Parse Result" },
  { source: "2", target: "3", label: "Generated Text" },
];

const LangGraphVisualizer: React.FC<LangGraphVisualizerProps> = ({
  nodes: initialNodes = defaultNodes,
  edges: initialEdges = defaultEdges,
  onNodeClick = () => {},
  onEdgeClick = () => {},
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges],
  );

  return (
    <Card className="w-full h-[600px] bg-background p-4 relative overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
      <div className="absolute top-4 right-4 flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Move className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Pan</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-[800px] h-[400px] border border-border rounded-lg">
          {/* Placeholder for nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute p-4 bg-card border border-border rounded-lg cursor-pointer"
              style={{
                left: node.position.x,
                top: node.position.y,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => onNodeClick(node.id)}
            >
              <div className="text-sm font-medium">{node.label}</div>
              <div className="text-xs text-muted-foreground">{node.type}</div>
            </div>
          ))}

          {/* Placeholder for edges - in a real implementation, you'd want to use a proper graph visualization library */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {edges.map((edge, index) => {
              const sourceNode = nodes.find((n) => n.id === edge.source);
              const targetNode = nodes.find((n) => n.id === edge.target);

              if (!sourceNode || !targetNode) return null;

              return (
                <g key={index}>
                  <line
                    x1={sourceNode.position.x}
                    y1={sourceNode.position.y}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-muted-foreground"
                  />
                  {edge.label && (
                    <text
                      x={(sourceNode.position.x + targetNode.position.x) / 2}
                      y={(sourceNode.position.y + targetNode.position.y) / 2}
                      textAnchor="middle"
                      className="text-xs fill-muted-foreground"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </Card>
  );
};

export default LangGraphVisualizer;
