import { 
  type Customer, type InsertCustomer,
  type Vendor, type InsertVendor,
  type RawMaterial, type InsertRawMaterial,
  type Sale, type InsertSale,
  type Purchase, type InsertPurchase,
  type Production, type InsertProduction,
  type ByproductSale, type InsertByproductSale
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  
  // Vendors
  getVendors(): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  
  // Raw Materials
  getRawMaterials(): Promise<RawMaterial[]>;
  getRawMaterial(id: string): Promise<RawMaterial | undefined>;
  createRawMaterial(material: InsertRawMaterial): Promise<RawMaterial>;
  updateRawMaterialStock(id: string, quantity: number): Promise<RawMaterial | undefined>;
  
  // Sales
  getSales(): Promise<Sale[]>;
  getSale(id: string): Promise<Sale | undefined>;
  createSale(sale: InsertSale): Promise<Sale>;
  updateSalePayment(id: string, paidAmount: number, status: string): Promise<Sale | undefined>;
  
  // Purchases
  getPurchases(): Promise<Purchase[]>;
  getPurchase(id: string): Promise<Purchase | undefined>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  updatePurchasePayment(id: string, paidAmount: number, status: string): Promise<Purchase | undefined>;
  
  // Production
  getProductions(): Promise<Production[]>;
  getProduction(id: string): Promise<Production | undefined>;
  createProduction(production: InsertProduction): Promise<Production>;
  
  // Byproduct Sales
  getByproductSales(): Promise<ByproductSale[]>;
  getByproductSale(id: string): Promise<ByproductSale | undefined>;
  createByproductSale(sale: InsertByproductSale): Promise<ByproductSale>;
}

export class MemStorage implements IStorage {
  private customers: Map<string, Customer>;
  private vendors: Map<string, Vendor>;
  private rawMaterials: Map<string, RawMaterial>;
  private sales: Map<string, Sale>;
  private purchases: Map<string, Purchase>;
  private productions: Map<string, Production>;
  private byproductSales: Map<string, ByproductSale>;
  private invoiceCounter: number;
  private billCounter: number;
  private byproductInvoiceCounter: number;

  constructor() {
    this.customers = new Map();
    this.vendors = new Map();
    this.rawMaterials = new Map();
    this.sales = new Map();
    this.purchases = new Map();
    this.productions = new Map();
    this.byproductSales = new Map();
    this.invoiceCounter = 1;
    this.billCounter = 1;
    this.byproductInvoiceCounter = 1;
  }

  // Customers
  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: string): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = randomUUID();
    const customer: Customer = { 
      ...insertCustomer, 
      id,
      email: insertCustomer.email ?? null,
      phone: insertCustomer.phone ?? null,
      address: insertCustomer.address ?? null
    };
    this.customers.set(id, customer);
    return customer;
  }

  // Vendors
  async getVendors(): Promise<Vendor[]> {
    return Array.from(this.vendors.values());
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    return this.vendors.get(id);
  }

  async createVendor(insertVendor: InsertVendor): Promise<Vendor> {
    const id = randomUUID();
    const vendor: Vendor = { 
      ...insertVendor, 
      id,
      email: insertVendor.email ?? null,
      phone: insertVendor.phone ?? null,
      address: insertVendor.address ?? null
    };
    this.vendors.set(id, vendor);
    return vendor;
  }

  // Raw Materials
  async getRawMaterials(): Promise<RawMaterial[]> {
    return Array.from(this.rawMaterials.values());
  }

  async getRawMaterial(id: string): Promise<RawMaterial | undefined> {
    return this.rawMaterials.get(id);
  }

  async createRawMaterial(insertMaterial: InsertRawMaterial): Promise<RawMaterial> {
    const id = randomUUID();
    const material: RawMaterial = { 
      ...insertMaterial, 
      id,
      currentStock: insertMaterial.currentStock ?? "0",
      reorderPoint: insertMaterial.reorderPoint ?? null
    };
    this.rawMaterials.set(id, material);
    return material;
  }

  async updateRawMaterialStock(id: string, quantity: number): Promise<RawMaterial | undefined> {
    const material = this.rawMaterials.get(id);
    if (!material) return undefined;
    
    const currentStock = parseFloat(material.currentStock);
    const newStock = (currentStock + quantity).toString();
    const updated = { ...material, currentStock: newStock };
    this.rawMaterials.set(id, updated);
    return updated;
  }

  // Sales
  async getSales(): Promise<Sale[]> {
    return Array.from(this.sales.values());
  }

  async getSale(id: string): Promise<Sale | undefined> {
    return this.sales.get(id);
  }

  async createSale(insertSale: InsertSale): Promise<Sale> {
    const id = randomUUID();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(this.invoiceCounter++).padStart(4, '0')}`;
    const sale: Sale = { 
      ...insertSale, 
      id,
      invoiceNumber,
      date: new Date(),
      customerId: insertSale.customerId ?? null,
      paidAmount: insertSale.paidAmount ?? "0",
      status: insertSale.status ?? "pending",
      isCredit: insertSale.isCredit ?? false
    };
    this.sales.set(id, sale);
    return sale;
  }

  async updateSalePayment(id: string, paidAmount: number, status: string): Promise<Sale | undefined> {
    const sale = this.sales.get(id);
    if (!sale) return undefined;
    
    const updated = { 
      ...sale, 
      paidAmount: paidAmount.toString(),
      status 
    };
    this.sales.set(id, updated);
    return updated;
  }

  // Purchases
  async getPurchases(): Promise<Purchase[]> {
    return Array.from(this.purchases.values());
  }

  async getPurchase(id: string): Promise<Purchase | undefined> {
    return this.purchases.get(id);
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const id = randomUUID();
    const billNumber = `BILL-${new Date().getFullYear()}-${String(this.billCounter++).padStart(4, '0')}`;
    const purchase: Purchase = { 
      ...insertPurchase, 
      id,
      billNumber,
      date: new Date(),
      vendorId: insertPurchase.vendorId ?? null,
      paidAmount: insertPurchase.paidAmount ?? "0",
      status: insertPurchase.status ?? "pending",
      isCredit: insertPurchase.isCredit ?? false
    };
    this.purchases.set(id, purchase);
    return purchase;
  }

  async updatePurchasePayment(id: string, paidAmount: number, status: string): Promise<Purchase | undefined> {
    const purchase = this.purchases.get(id);
    if (!purchase) return undefined;
    
    const updated = { 
      ...purchase, 
      paidAmount: paidAmount.toString(),
      status 
    };
    this.purchases.set(id, updated);
    return updated;
  }

  // Production
  async getProductions(): Promise<Production[]> {
    return Array.from(this.productions.values());
  }

  async getProduction(id: string): Promise<Production | undefined> {
    return this.productions.get(id);
  }

  async createProduction(insertProduction: InsertProduction): Promise<Production> {
    const id = randomUUID();
    const production: Production = { 
      ...insertProduction, 
      id,
      date: new Date(),
      byproductQuantity: insertProduction.byproductQuantity ?? null,
      byproductName: insertProduction.byproductName ?? null
    };
    this.productions.set(id, production);
    return production;
  }

  // Byproduct Sales
  async getByproductSales(): Promise<ByproductSale[]> {
    return Array.from(this.byproductSales.values());
  }

  async getByproductSale(id: string): Promise<ByproductSale | undefined> {
    return this.byproductSales.get(id);
  }

  async createByproductSale(insertSale: InsertByproductSale): Promise<ByproductSale> {
    const id = randomUUID();
    const invoiceNumber = `BP-${new Date().getFullYear()}-${String(this.byproductInvoiceCounter++).padStart(4, '0')}`;
    const sale: ByproductSale = { 
      ...insertSale, 
      id,
      invoiceNumber,
      date: new Date()
    };
    this.byproductSales.set(id, sale);
    return sale;
  }
}

export const storage = new MemStorage();
