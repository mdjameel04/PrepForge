"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Play,
  MessageSquare,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  Hammer,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Topics", href: "/topics", icon: BookOpen },
  { label: "Learn", href: "/learn", icon: GraduationCap },
  { label: "Practice", href: "/practice", icon: Play },
  { label: "AI Feedback", href: "/feedback", icon: MessageSquare },
  { label: "History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex flex-col h-screen bg-muted/30 border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-[60px] border-b border-border overflow-hidden">
        <div className="w-8 h-8 min-w-8 rounded-lg bg-white/20 flex items-center justify-center">
          <Image src={"/logo.svg"} alt="logo" width={20} height={20}/>
        </div>
        {!collapsed && (
          <span className="font-bold text-base tracking-tight whitespace-nowrap">
            PrepForge
          </span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1 overflow-hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] min-w-[18px]",
                  isActive ? "text-orange-500" : "group-hover:text-foreground"
                )}
              />
              {!collapsed && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="px-2 py-4 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          {collapsed ? (
            <ChevronRight className="w-[18px] h-[18px] min-w-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px] min-w-[18px]" />
              <span className="text-sm font-medium whitespace-nowrap">
                Collapse
              </span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;