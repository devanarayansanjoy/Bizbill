import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

interface DailyProfitabilityProps {
  todaySales: string;
  todayPurchases: string;
}

export default function DailyProfitability({ todaySales, todayPurchases }: DailyProfitabilityProps) {
  const sales = parseFloat(todaySales) || 0;
  const purchases = parseFloat(todayPurchases) || 0;
  const profit = sales - purchases;
  const isProfitable = profit >= 0;

  return (
    <Card className="mt-6 border-l-4 border-l-primary shadow-sm hover-elevate transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Today's Profitability
          </CardTitle>
          <p className="text-sm text-muted-foreground">Quick analysis of today's cash flow</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Sales (Today)</p>
            <p className="text-2xl font-mono font-bold text-gray-800">₹{sales.toLocaleString()}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Purchases (Today)</p>
            <p className="text-2xl font-mono font-bold text-gray-800">₹{purchases.toLocaleString()}</p>
          </div>
          
          <div className="space-y-2 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6">
            <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
            <div className={`flex items-center gap-2 text-3xl font-mono font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? <ArrowUpRight className="h-6 w-6" /> : <ArrowDownRight className="h-6 w-6" />}
              ₹{Math.abs(profit).toLocaleString()}
            </div>
            <p className={`text-xs font-medium ${isProfitable ? 'text-green-600/80' : 'text-red-600/80'}`}>
              {isProfitable ? "Operating at a profit today" : "Operating at a loss today"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
