import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  onSubmit: (data: InsertProduct) => void;
  isLoading?: boolean;
}

export function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      category: "",
      sellingPrice: "0",
      currentStock: "0",
      unit: "Pieces",
      imageUrl: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to storage. For now, we use a fake local URL or base64.
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      form.setValue("imageUrl", url);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Area */}
        <div className="flex flex-col items-center justify-center">
          <FormLabel className="mb-2 text-base font-medium">Product Image</FormLabel>
          <div 
            className="w-32 h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/50 relative overflow-hidden cursor-pointer hover:bg-muted transition-colors"
            onClick={() => document.getElementById("product-image")?.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera className="h-8 w-8 mb-2" />
                <span className="text-sm">Add Photo</span>
              </>
            )}
            <input 
              id="product-image" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" className="rounded-lg h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Category <span className="text-red-500">*</span></FormLabel>
              <div className="flex gap-2">
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg h-12 flex-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Oil">Oil</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="button" variant="outline" className="h-12 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-0 flex items-center gap-1 font-medium">
                  <Plus className="h-4 w-4" /> New
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sellingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input type="number" placeholder="0.00" className="pl-8 rounded-lg h-12" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="currentStock"
            render={({ field }) => (
              <FormItem className="flex-[2]">
                <FormLabel>Quantity <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input type="number" className="rounded-lg h-12" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="invisible">Unit</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="rounded-lg h-12">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pieces">Pieces</SelectItem>
                    <SelectItem value="Kg">Kg</SelectItem>
                    <SelectItem value="Liters">Liters</SelectItem>
                    <SelectItem value="Grams">Grams</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 rounded-xl text-lg font-medium bg-green-500 hover:bg-green-600 text-white mt-8"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "✓ Save Product"}
        </Button>
      </form>
    </Form>
  );
}
