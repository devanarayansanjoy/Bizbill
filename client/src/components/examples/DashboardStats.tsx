import DashboardStats from '../DashboardStats';

export default function DashboardStatsExample() {
  return (
    <DashboardStats 
      totalSales="1,45,230"
      pendingPayments="32,450"
      lowStock={3}
      todayProduction={250}
    />
  );
}
