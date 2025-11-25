import { FileText, Database, Upload } from "lucide-react";
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
    title: "File Upload",
    url: "/",
    icon: Upload,
    description: "Upload files for scanning",
  },
  {
    title: "Text Paste",
    url: "/text-paste",
    icon: FileText,
    description: "Paste your raw data",
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
    <Sidebar className="border-r-0">
      <SidebarContent className="gap-0 pt-8">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-sidebar-foreground/70 text-xs uppercase tracking-wider font-semibold mb-2">
            Data Input Options
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 px-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location === item.url}
                    className="sidebar-hover-effect px-4 py-3 font-medium hover:bg-sidebar-accent rounded-md"
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
