import { useQuery } from "@tanstack/react-query";
import DashboardStats from "@/components/DashboardStats";
import DailyProfitability from "@/components/DailyProfitability";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, Package, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DashboardStatsData {
  totalSales: string;
  pendingPayments: string;
  lowStock: number;
  todayProduction: number;
  todaySales?: string;
  todayPurchases?: string;
}

interface Transaction {
  id: string;
  invoiceNumber?: string;
  billNumber?: string;
  customerName?: string;
  vendorName?: string;
  totalAmount: string;
  status: string;
  date: Date;
}

export default function Dashboard() {
  const { data: stats, refetch: refetchStats, isRefetching: isRefetchingStats } = useQuery<DashboardStatsData>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: sales = [], refetch: refetchSales, isRefetching: isRefetchingSales } = useQuery<Transaction[]>({
    queryKey: ["/api/sales"],
  });

  const { data: purchases = [], refetch: refetchPurchases, isRefetching: isRefetchingPurchases } = useQuery<Transaction[]>({
    queryKey: ["/api/purchases"],
  });

  const isRefreshing = isRefetchingStats || isRefetchingSales || isRefetchingPurchases;

  const handleRefresh = () => {
    refetchStats();
    refetchSales();
    refetchPurchases();
  };

  const recentTransactions = [
    ...sales.map(s => ({
      id: s.id,
      type: "Sale",
      number: s.invoiceNumber || "",
      party: s.customerName || "",
      amount: parseFloat(s.totalAmount),
      status: s.status,
      date: new Date(s.date).getTime()
    })),
    ...purchases.map(p => ({
      id: p.id,
      type: "Purchase",
      number: p.billNumber || "",
      party: p.vendorName || "",
      amount: parseFloat(p.totalAmount),
      status: p.status,
      date: new Date(p.date).getTime()
    }))
  ].sort((a, b) => b.date - a.date).slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-chart-2">Paid</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "partial":
        return <Badge className="bg-chart-3">Partial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your business operations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            title="Sync / Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Link href="/sales">
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              New Sale
            </Button>
          </Link>
          <Link href="/purchases">
            <Button variant="outline">
              <Package className="mr-2 h-4 w-4" />
              New Purchase
            </Button>
          </Link>
        </div>
      </div>

      <DashboardStats
        totalSales={stats?.totalSales || "0"}
        pendingPayments={stats?.pendingPayments || "0"}
        lowStock={stats?.lowStock || 0}
        todayProduction={stats?.todayProduction || 0}
      />

      <DailyProfitability 
        todaySales={stats?.todaySales || "0"} 
        todayPurchases={stats?.todayPurchases || "0"} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions yet. Start by creating a sale or purchase.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((txn) => (
                  <TableRow key={txn.id} data-testid={`row-transaction-${txn.id}`}>
                    <TableCell>
                      <Badge variant="outline">{txn.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono">{txn.number}</TableCell>
                    <TableCell className="font-medium">{txn.party}</TableCell>
                    <TableCell className="font-mono">₹{txn.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(txn.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
