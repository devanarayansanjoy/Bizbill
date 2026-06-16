import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Dashboard from "@/pages/Dashboard";
import Sales from "@/pages/Sales";
import Purchases from "@/pages/Purchases";
import Production from "@/pages/Production";
import RawMaterials from "@/pages/RawMaterials";
import CreditPage from "@/pages/CreditPage";
import ByproductPage from "@/pages/ByproductPage";
import SalesHistory from "@/pages/SalesHistory";
import PurchaseHistory from "@/pages/PurchaseHistory";
import DailyAssessment from "@/pages/DailyAssessment";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/sales" component={Sales} />
      <Route path="/sales-history" component={SalesHistory} />
      <Route path="/purchases" component={Purchases} />
      <Route path="/purchase-history" component={PurchaseHistory} />
      <Route path="/production" component={Production} />
      <Route path="/materials" component={RawMaterials} />
      <Route path="/credit" component={CreditPage} />
      <Route path="/byproduct" component={ByproductPage} />
      <Route path="/daily-assessment" component={DailyAssessment} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between p-4 border-b">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
