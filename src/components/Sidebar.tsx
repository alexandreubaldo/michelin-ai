import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Calendar, File, Home, BarChart, FileCheck, Settings, Users, RefreshCw, ClipboardList } from "lucide-react";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      active
        ? "bg-sidebar-accent text-sidebar-accent-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    )}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  // In a real app, we'd determine the active route dynamically
  const currentPath = "/";

  return (
    <div className="border-r bg-[#083264] text-white h-screen w-64 shrink-0">
      <div className="flex h-full flex-col gap-2 p-4">
        
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <SidebarItem
              icon={Home}
              label="Dashboard"
              href="/"
              active={currentPath === "/"}
            />
            <SidebarItem
              icon={File}
              label="Certifications"
              href="/certifications"
              active={currentPath.startsWith("/certifications")}
            />
            <SidebarItem
              icon={FileCheck}
              label="Certifications"
              href="/certifications"
              active={currentPath.startsWith("/certifications")}
            />
            <SidebarItem
              icon={Calendar}
              label="Calendar"
              href="/calendar"
              active={currentPath.startsWith("/calendar")}
            />
            <SidebarItem
              icon={Users}
              label="Stakeholders"
              href="/stakeholders"
              active={currentPath.startsWith("/stakeholders")}
            />
            <SidebarItem
              icon={BarChart}
              label="Reports"
              href="/reports"
              active={currentPath.startsWith("/reports")}
            />
            <SidebarItem
              icon={RefreshCw}
              label="ERP Sync"
              href="/sync"
              active={currentPath.startsWith("/sync")}
            />
            <SidebarItem
              icon={ClipboardList}
              label="Personality Quiz"
              href="/personality-quiz"
              active={currentPath.startsWith("/personality-quiz")}
            />
          </nav>
        </div>
        <nav className="grid gap-1 px-2 py-2">
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/settings"
            active={currentPath.startsWith("/settings")}
          />
        </nav>
      </div>
    </div>
  );
}
