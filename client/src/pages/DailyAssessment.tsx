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
  totalPurchases: number;
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
          <h1 className="text-3xl font-semibold">Daily Assessment History</h1>
          <p className="text-muted-foreground">Historical breakdown of your daily profitability</p>
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
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Total Purchases</TableHead>
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
                      <TableCell className="font-mono text-gray-600">
                        ₹{report.totalSales.toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono text-gray-600">
                        ₹{report.totalPurchases.toLocaleString()}
                      </TableCell>
                      <TableCell className={`font-mono font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{Math.abs(report.netProfit).toLocaleString()}
                        {isProfitable ? ' (+)' : ' (-)'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={isProfitable ? "default" : "destructive"} className={isProfitable ? "bg-green-100 text-green-800 hover:bg-green-100 border border-green-200" : "bg-red-100 text-red-800 hover:bg-red-100 border border-red-200"}>
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
