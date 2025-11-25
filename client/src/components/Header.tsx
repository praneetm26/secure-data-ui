import logoImage from "@assets/pwc_logo_1764077389594.jpeg";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 pwc-orange-accent">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <SidebarTrigger data-testid="button-sidebar-toggle" className="hover:bg-accent rounded-md" />
          <div className="w-16 sm:w-20 h-10 sm:h-12 rounded-sm flex items-center justify-center shrink-0 overflow-hidden bg-white">
            <img 
              src={logoImage} 
              alt="PwC" 
              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-xl font-bold text-foreground tracking-tight truncate">
              Secure Sensitive Data Management
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block font-normal">for GenAI-Enabled Data Engineering</p>
          </div>
        </div>
      </div>
    </header>
  );
}
