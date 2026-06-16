import { useQuery } from "@tanstack/react-query";
import { RawMaterial, Product, Byproduct } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Leaf, Box, AlertTriangle } from "lucide-react";

export default function Inventory() {
  const { data: rawMaterials, isLoading: isMaterialsLoading } = useQuery<RawMaterial[]>({
    queryKey: ["/api/materials"],
  });

  const { data: products, isLoading: isProductsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: byproducts, isLoading: isByproductsLoading } = useQuery<Byproduct[]>({
    queryKey: ["/api/byproducts"],
  });

  const StockCard = ({ title, stock, unit, reorderPoint }: { title: string, stock: string, unit: string, reorderPoint?: string | null }) => {
    const isLowStock = reorderPoint && parseFloat(stock) <= parseFloat(reorderPoint);

    return (
      <div className={`p-6 rounded-2xl border ${isLowStock ? 'border-destructive/50 bg-destructive/10' : 'border-border bg-card'} shadow-sm`}>
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-foreground text-lg">{title}</h3>
          {isLowStock && <AlertTriangle className="text-destructive h-5 w-5" />}
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground font-medium">Current Stock</p>
          <p className={`text-3xl font-black mt-1 ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>
            {parseFloat(stock).toLocaleString()} <span className="text-base font-medium text-muted-foreground">{unit}</span>
          </p>
        </div>
        {reorderPoint && (
          <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
            <span className="text-muted-foreground">Reorder Point:</span>
            <span className="font-medium text-foreground">{reorderPoint} {unit}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground mt-1">Track your raw materials, finished products, and byproducts in real-time.</p>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="h-14 w-full justify-start rounded-xl bg-muted p-1">
          <TabsTrigger value="products" className="rounded-lg px-8 h-12 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Package className="mr-2 h-4 w-4" /> Finished Products
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-lg px-8 h-12 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Leaf className="mr-2 h-4 w-4" /> Raw Materials
          </TabsTrigger>
          <TabsTrigger value="byproducts" className="rounded-lg px-8 h-12 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Box className="mr-2 h-4 w-4" /> Byproducts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isProductsLoading ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">Loading products...</div>
            ) : products?.length === 0 ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">No products found. Add them in the Catalogue.</div>
            ) : (
              products?.map(p => (
                <StockCard key={p.id} title={p.name} stock={p.currentStock} unit={p.unit} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isMaterialsLoading ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">Loading materials...</div>
            ) : rawMaterials?.length === 0 ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">No raw materials found. Add them in Raw Materials.</div>
            ) : (
              rawMaterials?.map(m => (
                <StockCard key={m.id} title={m.name} stock={m.currentStock} unit={m.unit} reorderPoint={m.reorderPoint} />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="byproducts" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isByproductsLoading ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">Loading byproducts...</div>
            ) : byproducts?.length === 0 ? (
              <div className="col-span-full text-center py-10 text-muted-foreground">No byproducts found. They are created automatically during Production.</div>
            ) : (
              byproducts?.map(b => (
                <StockCard key={b.id} title={b.name} stock={b.currentStock} unit={b.unit} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
