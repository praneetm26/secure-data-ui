import { FolderOpen, Database } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Folder Upload",
    url: "/",
    icon: FolderOpen,
    description: "Upload folder for scanning",
  },
  {
    title: "Database Connection",
    url: "/database-connection",
    icon: Database,
    description: "Connect to your database",
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r-0 sidebar-gradient">
      <SidebarContent className="gap-0 pt-10">
        <SidebarGroup>
          <SidebarGroupLabel className="px-5 text-sidebar-foreground/80 text-xs uppercase tracking-widest font-bold mb-4 letter-spacing-wide">
            Data Input Options
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 px-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className="sidebar-hover-effect px-4 py-3.5 font-semibold hover:bg-sidebar-accent/50 rounded-lg transition-all"
                    data-active={location === item.url}
                  >
                    <Link href={item.url} data-testid={`link-sidebar-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
