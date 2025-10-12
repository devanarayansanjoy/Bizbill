import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSaleSchema, 
  insertPurchaseSchema, 
  insertProductionSchema,
  insertRawMaterialSchema,
  insertByproductSaleSchema,
  insertCustomerSchema,
  insertVendorSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
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

    res.json({
      totalSales: totalSales.toFixed(0),
      pendingPayments: pendingPayments.toFixed(0),
      lowStock,
      todayProduction: Math.round(todayProductionQty)
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
