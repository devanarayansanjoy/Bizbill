import { 
  type Customer, type InsertCustomer,
  type Vendor, type InsertVendor,
  type RawMaterial, type InsertRawMaterial,
  type Product, type InsertProduct,
  type Byproduct, type InsertByproduct,
  type Expense, type InsertExpense,
  type Sale, type InsertSale,
  type Purchase, type InsertPurchase,
  type Production, type InsertProduction,
  type ByproductSale, type InsertByproductSale,
  customers, vendors, rawMaterials, products, byproducts, expenses, sales, purchases, production, byproductSales
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  
  // Customers
  async getCustomers(): Promise<Customer[]> {
    return await db.select().from(customers);
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer;
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const [customer] = await db.insert(customers).values({
      ...insertCustomer,
      email: insertCustomer.email ?? null,
      phone: insertCustomer.phone ?? null,
      address: insertCustomer.address ?? null
    }).returning();
    return customer;
  }

  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return await db.select().from(vendors);
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
    return vendor;
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const [vendor] = await db.insert(vendors).values({
      ...insertVendor,
      email: insertVendor.email ?? null,
      phone: insertVendor.phone ?? null,
      address: insertVendor.address ?? null
    }).returning();
    return vendor;
  }

  // Raw Materials
  async getRawMaterials(): Promise<RawMaterial[]> {
    return await db.select().from(rawMaterials);
  }

  async getRawMaterial(id: string): Promise<RawMaterial | undefined> {
    const [material] = await db.select().from(rawMaterials).where(eq(rawMaterials.id, id));
    return material;
  }

  async createRawMaterial(insertMaterial: InsertRawMaterial): Promise<RawMaterial> {
    const [material] = await db.insert(rawMaterials).values({
      ...insertMaterial,
      currentStock: insertMaterial.currentStock ?? "0",
      reorderPoint: insertMaterial.reorderPoint ?? null
    }).returning();
    return material;
  }

  async updateRawMaterialStock(id: string, quantity: number): Promise<RawMaterial | undefined> {
    const material = await this.getRawMaterial(id);
    if (!material) return undefined;
    
    const currentStock = parseFloat(material.currentStock);
    const newStock = (currentStock + quantity).toString();
    
    const [updated] = await db
      .update(rawMaterials)
      .set({ currentStock: newStock })
      .where(eq(rawMaterials.id, id))
      .returning();
      
    return updated;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db.insert(products).values({
      ...insertProduct,
      currentStock: insertProduct.currentStock ?? "0",
      imageUrl: insertProduct.imageUrl ?? null
    }).returning();
    return product;
  }

  async updateProductStock(id: string, quantity: number): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;
    
    const currentStock = parseFloat(product.currentStock);
    const newStock = (currentStock + quantity).toString();
    
    const [updated] = await db
      .update(products)
      .set({ currentStock: newStock })
      .where(eq(products.id, id))
      .returning();
      
    return updated;
  }

  async updateProduct(id: string, data: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = await this.getProduct(id);
    if (!product) return undefined;

    const [updated] = await db
      .update(products)
      .set(data)
      .where(eq(products.id, id))
      .returning();

    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const product = await this.getProduct(id);
    if (!product) return false;

    await db.delete(products).where(eq(products.id, id));
    return true;
  }

  // Byproducts
  async getByproducts(): Promise<Byproduct[]> {
    return await db.select().from(byproducts);
  }

  async getByproduct(id: string): Promise<Byproduct | undefined> {
    const [byproduct] = await db.select().from(byproducts).where(eq(byproducts.id, id));
    return byproduct;
  }

  async createByproduct(insertByproduct: InsertByproduct): Promise<Byproduct> {
    const [byproduct] = await db.insert(byproducts).values({
      ...insertByproduct,
      currentStock: insertByproduct.currentStock ?? "0"
    }).returning();
    return byproduct;
  }

  async updateByproductStock(id: string, quantity: number): Promise<Byproduct | undefined> {
    const byproduct = await this.getByproduct(id);
    if (!byproduct) return undefined;
    
    const currentStock = parseFloat(byproduct.currentStock);
    const newStock = (currentStock + quantity).toString();
    
    const [updated] = await db
      .update(byproducts)
      .set({ currentStock: newStock })
      .where(eq(byproducts.id, id))
      .returning();
      
    return updated;
  }

  // Expenses
  async getExpenses(): Promise<Expense[]> {
    return await db.select().from(expenses);
  }

  async getExpense(id: string): Promise<Expense | undefined> {
    const [expense] = await db.select().from(expenses).where(eq(expenses.id, id));
    return expense;
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const [expense] = await db.insert(expenses).values({
      ...insertExpense,
      date: new Date()
    }).returning();
    return expense;
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    return await db.select().from(sales);
  }

  async getSale(id: string): Promise<Sale | undefined> {
    const [sale] = await db.select().from(sales).where(eq(sales.id, id));
    return sale;
  }

  async createSale(insertSale: InsertSale): Promise<Sale> {
    const allSales = await this.getSales();
    const invoiceCounter = allSales.length + 1;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(invoiceCounter).padStart(4, '0')}`;
    
    const [sale] = await db.insert(sales).values({
      ...insertSale,
      invoiceNumber,
      date: new Date(),
      customerId: insertSale.customerId ?? null,
      customerPhone: insertSale.customerPhone ?? null,
      productId: insertSale.productId ?? null,
      quantity: insertSale.quantity ?? null,
      unitPrice: insertSale.unitPrice ?? null,
      paidAmount: insertSale.paidAmount ?? "0",
      status: insertSale.status ?? "pending",
      isCredit: insertSale.isCredit ?? false,
      alertFrequency: insertSale.alertFrequency ?? "none"
    }).returning();

    // Auto-update inventory if linked to a product
    if (sale.productId && sale.quantity) {
      await this.updateProductStock(sale.productId, -parseFloat(sale.quantity));
    }
    
    return sale;
  }

  async updateSalePayment(id: string, paidAmount: number, status: string): Promise<Sale | undefined> {
    const [updated] = await db
      .update(sales)
      .set({ 
        paidAmount: paidAmount.toString(),
        status 
      })
      .where(eq(sales.id, id))
      .returning();
      
    return updated;
  }

  // Purchases
  async getPurchases(): Promise<Purchase[]> {
    return await db.select().from(purchases);
  }

  async getPurchase(id: string): Promise<Purchase | undefined> {
    const [purchase] = await db.select().from(purchases).where(eq(purchases.id, id));
    return purchase;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const allPurchases = await this.getPurchases();
    const billCounter = allPurchases.length + 1;
    const billNumber = `BILL-${new Date().getFullYear()}-${String(billCounter).padStart(4, '0')}`;
    
    const [purchase] = await db.insert(purchases).values({
      ...insertPurchase,
      billNumber,
      date: new Date(),
      vendorId: insertPurchase.vendorId ?? null,
      vendorPhone: insertPurchase.vendorPhone ?? null,
      rawMaterialId: insertPurchase.rawMaterialId ?? null,
      quantity: insertPurchase.quantity ?? null,
      unitPrice: insertPurchase.unitPrice ?? null,
      paidAmount: insertPurchase.paidAmount ?? "0",
      status: insertPurchase.status ?? "pending",
      isCredit: insertPurchase.isCredit ?? false,
      alertFrequency: insertPurchase.alertFrequency ?? "none"
    }).returning();

    // Auto-update inventory if linked to a raw material
    if (purchase.rawMaterialId && purchase.quantity) {
      await this.updateRawMaterialStock(purchase.rawMaterialId, parseFloat(purchase.quantity));
    }
    
    return purchase;
  }

  async updatePurchasePayment(id: string, paidAmount: number, status: string): Promise<Purchase | undefined> {
    const [updated] = await db
      .update(purchases)
      .set({ 
        paidAmount: paidAmount.toString(),
        status 
      })
      .where(eq(purchases.id, id))
      .returning();
      
    return updated;
  }

  // Production
  async getProductions(): Promise<Production[]> {
    return await db.select().from(production);
  }

  async getProduction(id: string): Promise<Production | undefined> {
    const [prod] = await db.select().from(production).where(eq(production.id, id));
    return prod;
  }

  async createProduction(insertProduction: InsertProduction): Promise<Production> {
    const [prod] = await db.insert(production).values({
      ...insertProduction,
      date: new Date(),
      rawMaterialId: insertProduction.rawMaterialId ?? null,
      rawMaterialQuantity: insertProduction.rawMaterialQuantity ?? null,
      productId: insertProduction.productId ?? null,
      byproductId: insertProduction.byproductId ?? null,
      byproductQuantity: insertProduction.byproductQuantity ?? null,
      byproductName: insertProduction.byproductName ?? null
    }).returning();
    
    // Auto-update inventory: Deduct Raw Material
    if (prod.rawMaterialId && prod.rawMaterialQuantity) {
      await this.updateRawMaterialStock(prod.rawMaterialId, -parseFloat(prod.rawMaterialQuantity));
    }
    
    // Auto-update inventory: Add Product
    if (prod.productId && prod.quantity) {
      await this.updateProductStock(prod.productId, parseFloat(prod.quantity));
    }

    // Auto-update inventory: Add Byproduct
    if (prod.byproductId && prod.byproductQuantity) {
      await this.updateByproductStock(prod.byproductId, parseFloat(prod.byproductQuantity));
    }

    return prod;
  }

  // Byproduct Sales
  async getByproductSales(): Promise<ByproductSale[]> {
    return await db.select().from(byproductSales);
  }

  async getByproductSale(id: string): Promise<ByproductSale | undefined> {
    const [sale] = await db.select().from(byproductSales).where(eq(byproductSales.id, id));
    return sale;
  }

  async createByproductSale(insertSale: InsertByproductSale): Promise<ByproductSale> {
    const allSales = await this.getByproductSales();
    const byproductInvoiceCounter = allSales.length + 1;
    const invoiceNumber = `BP-${new Date().getFullYear()}-${String(byproductInvoiceCounter).padStart(4, '0')}`;
    
    const [sale] = await db.insert(byproductSales).values({
      ...insertSale,
      invoiceNumber,
      byproductId: insertSale.byproductId ?? null,
      date: new Date()
    }).returning();
    
    // Auto-update inventory if linked to a byproduct
    if (sale.byproductId && sale.quantity) {
      await this.updateByproductStock(sale.byproductId, -parseFloat(sale.quantity));
    }

    return sale;
  }
}

export const dbStorage = new DatabaseStorage();
