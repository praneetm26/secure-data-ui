import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WizardProvider } from "@/context/WizardContext";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import WizardNavigation from "@/components/WizardNavigation";
import Step1 from "@/pages/Step1";
import Step2 from "@/pages/Step2";
import Step3 from "@/pages/Step3";
import TextPaste from "@/pages/TextPaste";
import DatabaseConnection from "@/pages/DatabaseConnection";

function WizardNavigationWrapper() {
  const [location] = useLocation();

  const getCurrentStep = () => {
    if (location === "/step2") return 2;
    if (location === "/step3") return 3;
    return 1;
  };

  const showWizardNavigation = () => {
    return location === "/" || location === "/step2" || location === "/step3";
  };

  if (!showWizardNavigation()) return null;

  return (
    <div className="container mx-auto">
      <WizardNavigation currentStep={getCurrentStep()} />
    </div>
  );
}

function App() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WizardProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <div className="flex-1 overflow-auto bg-background">
                  <WizardNavigationWrapper />
                  <Switch>
                    <Route path="/text-paste" component={TextPaste} />
                    <Route path="/database-connection" component={DatabaseConnection} />
                    <Route path="/step2" component={Step2} />
                    <Route path="/step3" component={Step3} />
                    <Route path="/" component={Step1} />
                  </Switch>
                </div>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </WizardProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
