import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Factory, 
  Boxes, 
  CreditCard, 
  Recycle,
  History,
  Receipt,
  ChevronRight,
  LineChart,
  Settings as SettingsIcon,
  BookOpen,
  Wallet,
  ClipboardList
} from "lucide-react";
import { useLocation, Link } from "wouter";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Catalogue", url: "/catalogue", icon: BookOpen },
  { title: "Inventory", url: "/inventory", icon: ClipboardList },
  { 
    title: "Reports & Analytics", 
    icon: LineChart,
    subItems: [
      { title: "Daily Assessment", url: "/daily-assessment", icon: LineChart },
      { title: "Credit Management", url: "/credit", icon: Receipt },
    ]
  },
  { 
    title: "Sales", 
    icon: ShoppingCart,
    subItems: [
      { title: "New Sale Entry", url: "/sales", icon: ShoppingCart },
      { title: "Sales History", url: "/sales-history", icon: History },
    ]
  },
  { 
    title: "Purchases", 
    icon: Package,
    subItems: [
      { title: "New Purchase Entry", url: "/purchases", icon: Package },
      { title: "Purchase History", url: "/purchase-history", icon: History },
    ]
  },
  { title: "Production", url: "/production", icon: Factory },
  { title: "Expenses", url: "/expenses", icon: Wallet },
  { title: "Raw Materials", url: "/materials", icon: Boxes },
  { title: "Byproduct Sales", url: "/byproduct", icon: Recycle },
];

function NavGroup({ item, location }: { item: any; location: string }) {
  const isActive = item.subItems.some((subItem: any) => location === subItem.url);
  const [isOpen, setIsOpen] = useState(isActive);

  // Synchronize the open state with the active route whenever the user navigates
  useEffect(() => {
    setIsOpen(isActive);
  }, [location, isActive]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
            <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.subItems.map((subItem: any) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild isActive={location === subItem.url}>
                  <Link href={subItem.url} data-testid={`link-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <subItem.icon className="h-4 w-4 mr-2" />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-semibold text-primary">BillMaster</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.subItems) {
                  return <NavGroup key={item.title} item={item} location={location} />;
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={location === item.url}>
                      <Link href={item.url!} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location === "/settings"}>
              <Link href="/settings" data-testid="link-settings">
                <SettingsIcon className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
