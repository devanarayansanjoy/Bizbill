import { Link } from "wouter";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Factory, 
  Boxes, 
  CreditCard, 
  Recycle,
  History,
  LineChart,
  Settings as SettingsIcon,
  BookOpen,
  Wallet,
  ClipboardList,
  Receipt
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const modules = [
  { 
    title: "Analytics Dashboard", 
    description: "View overall business performance",
    url: "/dashboard", 
    icon: LayoutDashboard,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/50"
  },
  { 
    title: "Product Catalogue", 
    description: "Manage products and pricing",
    url: "/catalogue", 
    icon: BookOpen,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/50"
  },
  { 
    title: "Inventory", 
    description: "Track current stock levels",
    url: "/inventory", 
    icon: ClipboardList,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/50"
  },
  { 
    title: "New Sale", 
    description: "Create a new sales invoice",
    url: "/sales", 
    icon: ShoppingCart,
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/50"
  },
  { 
    title: "Sales History", 
    description: "View past sales records",
    url: "/sales-history", 
    icon: History,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/50"
  },
  { 
    title: "New Purchase", 
    description: "Record new material purchases",
    url: "/purchases", 
    icon: Package,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/50"
  },
  { 
    title: "Purchase History", 
    description: "View past purchase records",
    url: "/purchase-history", 
    icon: History,
    color: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/50"
  },
  { 
    title: "Production Entry", 
    description: "Record daily manufacturing",
    url: "/production", 
    icon: Factory,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/50"
  },
  { 
    title: "Expenses", 
    description: "Manage business expenses",
    url: "/expenses", 
    icon: Wallet,
    color: "text-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/50"
  },
  { 
    title: "Raw Materials", 
    description: "Manage material inventory",
    url: "/materials", 
    icon: Boxes,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/50"
  },
  { 
    title: "Byproduct Sales", 
    description: "Sell manufacturing byproducts",
    url: "/byproduct", 
    icon: Recycle,
    color: "text-lime-500",
    bgColor: "bg-lime-50 dark:bg-lime-950/50"
  },
  { 
    title: "Daily Assessment", 
    description: "View daily business reports",
    url: "/daily-assessment", 
    icon: LineChart,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/50"
  },
  { 
    title: "Credit Management", 
    description: "Manage customer/vendor credit",
    url: "/credit", 
    icon: Receipt,
    color: "text-teal-500",
    bgColor: "bg-teal-50 dark:bg-teal-950/50"
  },
  { 
    title: "Settings", 
    description: "App configuration and profile",
    url: "/settings", 
    icon: SettingsIcon,
    color: "text-slate-500",
    bgColor: "bg-slate-50 dark:bg-slate-950/50"
  },
];

export default function QuickAccess() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Quick Access</h1>
        <p className="text-muted-foreground mt-2 text-lg">Navigate to any module instantly</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {modules.map((module) => (
          <Link key={module.title} href={module.url}>
            <Card className="group h-full cursor-pointer hover:shadow-md hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/60">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-2xl ${module.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                  <module.icon className={`w-8 h-8 ${module.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {module.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
