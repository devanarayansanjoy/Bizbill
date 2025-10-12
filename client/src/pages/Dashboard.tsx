import DashboardStats from "@/components/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const recentTransactions = [
    { id: "1", type: "Sale", number: "INV-2024-156", party: "ABC Industries", amount: 12500, status: "paid" },
    { id: "2", type: "Purchase", number: "BILL-2024-089", party: "Material Suppliers", amount: 8900, status: "pending" },
    { id: "3", type: "Sale", number: "INV-2024-155", party: "XYZ Corp", amount: 18200, status: "partial" },
  ];

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
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your business operations</p>
      </div>

      <DashboardStats
        totalSales="1,45,230"
        pendingPayments="32,450"
        lowStock={3}
        todayProduction={250}
      />

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  );
}
