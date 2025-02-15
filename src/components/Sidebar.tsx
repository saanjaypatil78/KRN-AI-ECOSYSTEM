import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  Users,
  Activity,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const defaultNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Agents", href: "/agents" },
  { icon: Activity, label: "System Health", href: "/health" },
  { icon: Network, label: "LangGraph", href: "/langgraph" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = ({
  className = "",
  isCollapsed: propIsCollapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(propIsCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onToggleCollapse();
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-background border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Logo Area */}
      <div className="h-16 border-b flex items-center justify-between px-4">
        {!isCollapsed && <span className="text-xl font-bold">KRN System</span>}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={toggleCollapse}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Navigation Items */}
      <TooltipProvider>
        <nav className="flex-1 p-2 space-y-2">
          {defaultNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.label} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full flex items-center justify-start gap-2 px-3",
                      isCollapsed && "justify-center px-2",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>

      {/* Footer Area */}
      <div className="h-16 border-t flex items-center p-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-2",
            isCollapsed && "justify-center",
          )}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          {!isCollapsed && <span>Admin User</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
