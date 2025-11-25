import logoImage from "@assets/pwc_logo_1764077389594.jpeg";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="bg-card border-b border-card-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <SidebarTrigger data-testid="button-sidebar-toggle" />
          <div className="w-16 sm:w-20 h-10 sm:h-12 rounded-sm flex items-center justify-center shrink-0 overflow-hidden bg-white">
            <img 
              src={logoImage} 
              alt="PwC" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-lg font-semibold text-foreground truncate">
              Secure Sensitive Data Management
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">for GenAI-Enabled Data Engineering</p>
          </div>
        </div>
      </div>
    </header>
  );
}
