import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Expense, insertExpenseSchema, InsertExpense } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Wallet, Zap, Users, Receipt } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Expenses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: expenses, isLoading } = useQuery<Expense[]>({
    queryKey: ["/api/expenses"],
  });

  const form = useForm<InsertExpense>({
    resolver: zodResolver(insertExpenseSchema),
    defaultValues: {
      description: "",
      amount: "0",
      category: "Electricity",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertExpense) => {
      const res = await apiRequest("POST", "/api/expenses", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      setIsModalOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Expense added successfully",
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

  const onSubmit = (data: InsertExpense) => {
    createMutation.mutate(data);
  };

  const totalExpenses = expenses?.reduce((sum, e) => sum + parseFloat(e.amount), 0) || 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Electricity": return <Zap className="h-5 w-5 text-yellow-500" />;
      case "Labor": return <Users className="h-5 w-5 text-blue-500" />;
      default: return <Receipt className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Expense Tracker</h1>
          <p className="text-muted-foreground mt-1">Track overheads like electricity, labor, and maintenance.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold shadow-sm h-11 px-6 rounded-xl">
              <Plus className="mr-2 h-5 w-5" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Record Expense</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg h-12">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Electricity">Electricity / Current Charge</SelectItem>
                          <SelectItem value="Labor">Labor Wages</SelectItem>
                          <SelectItem value="Maintenance">Maintenance</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Other">Other Overhead</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., June Electricity Bill" className="rounded-lg h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
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

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-xl text-lg font-medium bg-red-500 hover:bg-red-600 text-white mt-8"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Saving..." : "Save Expense"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100 flex items-center gap-4">
          <div className="bg-red-100 p-4 rounded-xl text-red-600">
            <Wallet className="h-8 w-8" />
          </div>
          <div>
            <p className="text-red-800 font-medium text-sm">Total Overhead Expenses</p>
            <h2 className="text-3xl font-black text-red-900 mt-1">₹{totalExpenses.toLocaleString()}</h2>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-muted-foreground text-sm font-medium uppercase tracking-wider">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">Loading expenses...</td>
              </tr>
            ) : expenses?.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-muted-foreground">No expenses recorded yet.</td>
              </tr>
            ) : (
              expenses?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
                <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                    {format(new Date(expense.date), "MMM dd, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(expense.category)}
                      <span className="font-medium text-foreground">{expense.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{expense.description}</td>
                  <td className="px-6 py-4 text-right font-bold text-red-600 dark:text-red-500">
                    ₹{parseFloat(expense.amount).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
