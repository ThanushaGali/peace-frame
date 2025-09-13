import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  ClipboardCheck,
  Calendar,
  BookOpen,
  Users,
  BarChart3,
  LogIn,
  LogOut,
  Menu,
  X,
  Heart,
  Globe
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "AI Chat", url: "/chat", icon: MessageCircle },
  { title: "Screening", url: "/screening", icon: ClipboardCheck },
  { title: "Booking", url: "/booking", icon: Calendar },
  { title: "Resources", url: "/resources", icon: BookOpen },
  { title: "Forum", url: "/forum", icon: Users },
  { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
];

const authItems = [
  { title: "Login", url: "/login", icon: LogIn },
];

interface AppSidebarProps {
  user?: { role: string; name: string } | null;
  onLogout?: () => void;
  onLanguageToggle?: () => void;
  currentLanguage?: string;
}

export function AppSidebar({ 
  user = null, 
  onLogout = () => {}, 
  onLanguageToggle = () => {},
  currentLanguage = "EN"
}: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-primary/5 text-muted-foreground hover:text-foreground";

  // Filter navigation based on user role
  const getFilteredNavigation = () => {
    if (!user) return navigationItems.filter(item => !['Dashboard'].includes(item.title));
    if (user.role === 'admin') return navigationItems;
    if (user.role === 'counsellor') return navigationItems.filter(item => 
      ['Home', 'Booking', 'Dashboard'].includes(item.title)
    );
    return navigationItems.filter(item => item.title !== 'Dashboard');
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Heart className={`${collapsed ? 'h-5 w-5' : 'h-6 w-6'} text-white`} />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sm text-foreground">MindSupport</h2>
              <p className="text-xs text-muted-foreground">Digital Wellness</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getFilteredNavigation().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      aria-label={item.title}
                    >
                      <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!user && (
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {authItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        end 
                        className={getNavCls}
                        aria-label={item.title}
                      >
                        <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="space-y-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            onClick={onLanguageToggle}
            className={`w-full ${collapsed ? 'px-0' : 'justify-start'}`}
            aria-label="Toggle Language"
          >
            <Globe className={`${collapsed ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
            {!collapsed && <span>{currentLanguage}</span>}
          </Button>

          {/* User Info & Logout */}
          {user && (
            <>
              {!collapsed && (
                <div className="px-2 py-1 text-xs text-muted-foreground">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="capitalize">{user.role}</p>
                </div>
              )}
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "sm"}
                onClick={onLogout}
                className={`w-full ${collapsed ? 'px-0' : 'justify-start'} text-destructive hover:text-destructive`}
                aria-label="Logout"
              >
                <LogOut className={`${collapsed ? 'h-4 w-4' : 'h-4 w-4 mr-2'}`} />
                {!collapsed && <span>Logout</span>}
              </Button>
            </>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}