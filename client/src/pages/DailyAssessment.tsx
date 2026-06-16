import { useQuery } from "@tanstack/react-query";
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
import { Activity, CalendarDays, TrendingUp, TrendingDown } from "lucide-react";

interface DailyReport {
  date: string;
  totalSales: number;
  totalByproductSales: number;
  totalPurchases: number;
  totalExpenses: number;
  totalRevenue: number;
  totalCost: number;
  netProfit: number;
}

export default function DailyAssessment() {
  const { data: reports = [], isLoading } = useQuery<DailyReport[]>({
    queryKey: ["/api/reports/daily-assessment"],
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-semibold">Daily Profit & Loss</h1>
          <p className="text-muted-foreground">Historical breakdown of your daily revenue vs production costs</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            All Historical Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground animate-pulse">Loading historical data...</div>
          ) : reports.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No historical transaction data found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Total Revenue</TableHead>
                  <TableHead>Total Costs</TableHead>
                  <TableHead>Net Profit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => {
                  const isProfitable = report.netProfit >= 0;
                  return (
                    <TableRow key={report.date}>
                      <TableCell className="font-medium">
                        {new Date(report.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        <div className="flex flex-col">
                          <span className="text-foreground">₹{report.totalRevenue.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">Sales: {report.totalSales} | BP: {report.totalByproductSales}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground">
                        <div className="flex flex-col">
                          <span className="text-foreground">₹{report.totalCost.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground">Purchases: {report.totalPurchases} | Exp: {report.totalExpenses}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-mono font-bold ${isProfitable ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        ₹{Math.abs(report.netProfit).toLocaleString()}
                        {isProfitable ? ' (+)' : ' (-)'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isProfitable ? "default" : "destructive"} className={isProfitable ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 border border-green-200 dark:border-green-800" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 border border-red-200 dark:border-red-800"}>
                          {isProfitable ? (
                            <>
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Profitable
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-3 h-3 mr-1" />
                              Loss
                            </>
                          )}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
