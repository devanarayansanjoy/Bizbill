import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreditTransaction {
  id: string;
  invoiceNumber: string;
  partyName: string;
  date: string;
  total: number;
  paid: number;
  balance: number;
  status: "pending" | "partial" | "overdue";
}

interface CreditManagementProps {
  creditSales: CreditTransaction[];
  creditPurchases: CreditTransaction[];
}

export default function CreditManagement({ creditSales, creditPurchases }: CreditManagementProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      case "partial":
        return <Badge className="bg-chart-3">Partial</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const CreditTable = ({ data }: { data: CreditTransaction[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice/Bill No.</TableHead>
          <TableHead>Party Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Paid</TableHead>
          <TableHead>Balance</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} data-testid={`row-credit-${item.id}`}>
            <TableCell className="font-mono">{item.invoiceNumber}</TableCell>
            <TableCell className="font-medium">{item.partyName}</TableCell>
            <TableCell className="text-muted-foreground">{item.date}</TableCell>
            <TableCell className="font-mono">₹{item.total.toFixed(2)}</TableCell>
            <TableCell className="font-mono">₹{item.paid.toFixed(2)}</TableCell>
            <TableCell className="font-mono font-semibold">₹{item.balance.toFixed(2)}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
            <TableCell>
              <Button size="sm" variant="outline" data-testid={`button-payment-${item.id}`}>
                Record Payment
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sales" data-testid="tab-credit-sales">Credit Sales</TabsTrigger>
            <TabsTrigger value="purchases" data-testid="tab-credit-purchases">Credit Purchases</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <CreditTable data={creditSales} />
          </TabsContent>
          <TabsContent value="purchases">
            <CreditTable data={creditPurchases} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
