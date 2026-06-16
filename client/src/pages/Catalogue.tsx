import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Package } from "lucide-react";
import { ProductForm } from "@/components/ProductForm";
import { useToast } from "@/hooks/use-toast";

export default function Catalogue() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/products", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      setIsAddModalOpen(false);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Product Catalogue</h1>
          <p className="text-muted-foreground mt-1">Manage your manufactured products and pricing</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950 font-semibold shadow-sm h-11 px-6 rounded-xl">
              <Plus className="mr-2 h-5 w-5" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Product</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <ProductForm 
                onSubmit={(data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-10 h-12 rounded-xl bg-background border-border shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-2xl h-64 border border-border shadow-sm animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No products found</h3>
          <p className="text-muted-foreground mt-1">Add your first product to the catalogue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="aspect-video bg-muted/50 flex items-center justify-center relative overflow-hidden">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Package className="h-12 w-12 text-muted-foreground" />
                )}
                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-foreground shadow-sm">
                  {product.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Selling Price</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-500">₹{parseFloat(product.sellingPrice).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground font-medium">In Stock</p>
                    <p className="text-lg font-semibold text-foreground">
                      {parseFloat(product.currentStock)} <span className="text-sm font-medium text-muted-foreground">{product.unit}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
