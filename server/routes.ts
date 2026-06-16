import type { Express } from "express";
import { createServer, type Server } from "http";
import { dbStorage as storage } from "./db-storage";
import { requireAuth } from "./middleware/auth";
import { 
  insertSaleSchema, 
  insertPurchaseSchema, 
  insertProductionSchema,
  insertRawMaterialSchema,
  insertByproductSaleSchema,
  insertCustomerSchema,
  insertVendorSchema,
  insertProductSchema,
  insertByproductSchema,
  insertExpenseSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Protect all /api routes with JWT authentication
  app.use("/api", requireAuth);

  // Products routes
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Byproducts routes
  app.get("/api/byproducts", async (req, res) => {
    const byproducts = await storage.getByproducts();
    res.json(byproducts);
  });

  app.post("/api/byproducts", async (req, res) => {
    try {
      const validatedData = insertByproductSchema.parse(req.body);
      const byproduct = await storage.createByproduct(validatedData);
      res.json(byproduct);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Expenses routes
  app.get("/api/expenses", async (req, res) => {
    const expenses = await storage.getExpenses();
    res.json(expenses);
  });

  app.post("/api/expenses", async (req, res) => {
    try {
      const validatedData = insertExpenseSchema.parse(req.body);
      const expense = await storage.createExpense(validatedData);
      res.json(expense);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Sales routes
  app.get("/api/sales", async (req, res) => {
    const sales = await storage.getSales();
    res.json(sales);
  });

  app.post("/api/sales", async (req, res) => {
    try {
      const validatedData = insertSaleSchema.parse(req.body);
      const sale = await storage.createSale(validatedData);
      res.json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/sales/:id/payment", async (req, res) => {
    try {
      const { id } = req.params;
      const { paidAmount, status } = req.body;
      const sale = await storage.updateSalePayment(id, parseFloat(paidAmount), status);
      if (!sale) {
        return res.status(404).json({ error: "Sale not found" });
      }
      res.json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Purchase routes
  app.get("/api/purchases", async (req, res) => {
    const purchases = await storage.getPurchases();
    res.json(purchases);
  });

  app.post("/api/purchases", async (req, res) => {
    try {
      const validatedData = insertPurchaseSchema.parse(req.body);
      const purchase = await storage.createPurchase(validatedData);
      res.json(purchase);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/purchases/:id/payment", async (req, res) => {
    try {
      const { id } = req.params;
      const { paidAmount, status } = req.body;
      const purchase = await storage.updatePurchasePayment(id, parseFloat(paidAmount), status);
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      res.json(purchase);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Production routes
  app.get("/api/production", async (req, res) => {
    const productions = await storage.getProductions();
    res.json(productions);
  });

  app.post("/api/production", async (req, res) => {
    try {
      const validatedData = insertProductionSchema.parse(req.body);
      const production = await storage.createProduction(validatedData);
      res.json(production);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Raw materials routes
  app.get("/api/materials", async (req, res) => {
    const materials = await storage.getRawMaterials();
    res.json(materials);
  });

  app.post("/api/materials", async (req, res) => {
    try {
      const validatedData = insertRawMaterialSchema.parse(req.body);
      const material = await storage.createRawMaterial(validatedData);
      res.json(material);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/materials/:id/stock", async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const material = await storage.updateRawMaterialStock(id, parseFloat(quantity));
      if (!material) {
        return res.status(404).json({ error: "Material not found" });
      }
      res.json(material);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Byproduct sales routes
  app.get("/api/byproduct-sales", async (req, res) => {
    const sales = await storage.getByproductSales();
    res.json(sales);
  });

  app.post("/api/byproduct-sales", async (req, res) => {
    try {
      const validatedData = insertByproductSaleSchema.parse(req.body);
      const sale = await storage.createByproductSale(validatedData);
      res.json(sale);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Customer routes
  app.get("/api/customers", async (req, res) => {
    const customers = await storage.getCustomers();
    res.json(customers);
  });

  app.post("/api/customers", async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      const customer = await storage.createCustomer(validatedData);
      res.json(customer);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Vendor routes
  app.get("/api/vendors", async (req, res) => {
    const vendors = await storage.getVendors();
    res.json(vendors);
  });

  app.post("/api/vendors", async (req, res) => {
    try {
      const validatedData = insertVendorSchema.parse(req.body);
      const vendor = await storage.createVendor(validatedData);
      res.json(vendor);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Dashboard stats route
  app.get("/api/dashboard/stats", async (req, res) => {
    const sales = await storage.getSales();
    const purchases = await storage.getPurchases();
    const materials = await storage.getRawMaterials();
    const productions = await storage.getProductions();

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const monthlySales = sales.filter(s => new Date(s.date) >= thisMonth);
    const totalSales = monthlySales.reduce((sum, s) => sum + parseFloat(s.totalAmount), 0);

    const creditSales = sales.filter(s => s.isCredit);
    const pendingPayments = creditSales.reduce((sum, s) => {
      const balance = parseFloat(s.totalAmount) - parseFloat(s.paidAmount);
      return sum + balance;
    }, 0);

    const lowStock = materials.filter(m => {
      if (!m.reorderPoint) return false;
      return parseFloat(m.currentStock) <= parseFloat(m.reorderPoint);
    }).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayProductions = productions.filter(p => {
      const prodDate = new Date(p.date);
      prodDate.setHours(0, 0, 0, 0);
      return prodDate.getTime() === today.getTime();
    });
    const todayProductionQty = todayProductions.reduce((sum, p) => sum + parseFloat(p.quantity), 0);

    const todaySales = sales.filter(s => {
      const saleDate = new Date(s.date);
      saleDate.setHours(0, 0, 0, 0);
      return saleDate.getTime() === today.getTime();
    }).reduce((sum, s) => sum + parseFloat(s.totalAmount), 0);

    const todayPurchases = purchases.filter(p => {
      const purchDate = new Date(p.date);
      purchDate.setHours(0, 0, 0, 0);
      return purchDate.getTime() === today.getTime();
    }).reduce((sum, p) => sum + parseFloat(p.totalAmount), 0);

    res.json({
      totalSales: totalSales.toFixed(0),
      pendingPayments: pendingPayments.toFixed(0),
      lowStock,
      todayProduction: Math.round(todayProductionQty),
      todaySales: todaySales.toFixed(0),
      todayPurchases: todayPurchases.toFixed(0)
    });
  });

  // Reports routes
  app.get("/api/reports/daily-assessment", async (req, res) => {
    try {
      const sales = await storage.getSales();
      const byproductSales = await storage.getByproductSales();
      const purchases = await storage.getPurchases();
      const expenses = await storage.getExpenses();
      
      const dailyData: Record<string, { 
        date: string, 
        totalSales: number, 
        totalByproductSales: number,
        totalPurchases: number,
        totalExpenses: number
      }> = {};

      const getDay = (date: string | Date) => new Date(date).toISOString().split('T')[0];

      // Process Sales
      sales.forEach(sale => {
        const dateKey = getDay(sale.date);
        if (!dailyData[dateKey]) dailyData[dateKey] = { date: dateKey, totalSales: 0, totalByproductSales: 0, totalPurchases: 0, totalExpenses: 0 };
        dailyData[dateKey].totalSales += parseFloat(sale.totalAmount);
      });

      // Process Byproduct Sales
      byproductSales.forEach(sale => {
        const dateKey = getDay(sale.date);
        if (!dailyData[dateKey]) dailyData[dateKey] = { date: dateKey, totalSales: 0, totalByproductSales: 0, totalPurchases: 0, totalExpenses: 0 };
        dailyData[dateKey].totalByproductSales += parseFloat(sale.totalAmount);
      });

      // Process Purchases
      purchases.forEach(purchase => {
        const dateKey = getDay(purchase.date);
        if (!dailyData[dateKey]) dailyData[dateKey] = { date: dateKey, totalSales: 0, totalByproductSales: 0, totalPurchases: 0, totalExpenses: 0 };
        dailyData[dateKey].totalPurchases += parseFloat(purchase.totalAmount);
      });

      // Process Expenses
      expenses.forEach(expense => {
        const dateKey = getDay(expense.date);
        if (!dailyData[dateKey]) dailyData[dateKey] = { date: dateKey, totalSales: 0, totalByproductSales: 0, totalPurchases: 0, totalExpenses: 0 };
        dailyData[dateKey].totalExpenses += parseFloat(expense.amount);
      });

      // Convert to array and calculate profit
      const report = Object.values(dailyData).map(day => {
        const totalRevenue = day.totalSales + day.totalByproductSales;
        const totalCost = day.totalPurchases + day.totalExpenses;
        return {
          date: day.date,
          totalSales: day.totalSales,
          totalByproductSales: day.totalByproductSales,
          totalPurchases: day.totalPurchases,
          totalExpenses: day.totalExpenses,
          totalRevenue,
          totalCost,
          netProfit: totalRevenue - totalCost
        };
      });

      // Sort descending (newest first)
      report.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      res.json(report);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
