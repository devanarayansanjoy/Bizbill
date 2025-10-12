import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, AlertTriangle, TrendingUp, Package } from "lucide-react";

interface StatsProps {
  totalSales: string;
  pendingPayments: string;
  lowStock: number;
  todayProduction: number;
}

export default function DashboardStats({ totalSales, pendingPayments, lowStock, todayProduction }: StatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold font-mono" data-testid="text-total-sales">₹{totalSales}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold font-mono" data-testid="text-pending-payments">₹{pendingPayments}</div>
          <p className="text-xs text-muted-foreground">Outstanding credit</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-chart-3" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold" data-testid="text-low-stock">{lowStock}</div>
          <p className="text-xs text-muted-foreground">Items below reorder point</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Production</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold" data-testid="text-production">{todayProduction}</div>
          <p className="text-xs text-muted-foreground">Units produced</p>
        </CardContent>
      </Card>
    </div>
  );
}
