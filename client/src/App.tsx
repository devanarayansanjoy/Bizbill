import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Dashboard from "@/pages/Dashboard";
import Catalogue from "@/pages/Catalogue";
import Inventory from "@/pages/Inventory";
import Expenses from "@/pages/Expenses";
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
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";
import QuickAccess from "@/pages/QuickAccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={QuickAccess} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/catalogue" component={Catalogue} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/expenses" component={Expenses} />
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

function MainApp() {
  const { session, isLoading, signOut } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <Auth />;
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Router />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
