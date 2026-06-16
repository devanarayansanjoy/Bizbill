import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Customers
export const customers = pgTable("customers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
});

export const insertCustomerSchema = createInsertSchema(customers).omit({ id: true });
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

// Vendors
export const vendors = pgTable("vendors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
});

export const insertVendorSchema = createInsertSchema(vendors).omit({ id: true });
export type InsertVendor = z.infer<typeof insertVendorSchema>;
export type Vendor = typeof vendors.$inferSelect;

// Raw Materials
export const rawMaterials = pgTable("raw_materials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  unit: text("unit").notNull(),
  currentStock: decimal("current_stock", { precision: 10, scale: 2 }).notNull().default("0"),
  reorderPoint: decimal("reorder_point", { precision: 10, scale: 2 }),
});

export const insertRawMaterialSchema = createInsertSchema(rawMaterials).omit({ id: true });
export type InsertRawMaterial = z.infer<typeof insertRawMaterialSchema>;
export type RawMaterial = typeof rawMaterials.$inferSelect;

// Sales
export const sales = pgTable("sales", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerId: varchar("customer_id").references(() => customers.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone"),
  date: timestamp("date").notNull().defaultNow(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  isCredit: boolean("is_credit").notNull().default(false),
  alertFrequency: text("alert_frequency").notNull().default("none"),
});

export const insertSaleSchema = createInsertSchema(sales).omit({ 
  id: true, 
  invoiceNumber: true, 
  date: true 
});
export type InsertSale = z.infer<typeof insertSaleSchema>;
export type Sale = typeof sales.$inferSelect;

// Purchases
export const purchases = pgTable("purchases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  billNumber: text("bill_number").notNull().unique(),
  vendorId: varchar("vendor_id").references(() => vendors.id),
  vendorName: text("vendor_name").notNull(),
  vendorPhone: text("vendor_phone"),
  date: timestamp("date").notNull().defaultNow(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  isCredit: boolean("is_credit").notNull().default(false),
  alertFrequency: text("alert_frequency").notNull().default("none"),
});

export const insertPurchaseSchema = createInsertSchema(purchases).omit({ 
  id: true, 
  billNumber: true, 
  date: true 
});
export type InsertPurchase = z.infer<typeof insertPurchaseSchema>;
export type Purchase = typeof purchases.$inferSelect;

// Production
export const production = pgTable("production", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productName: text("product_name").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  rawMaterialCost: decimal("raw_material_cost", { precision: 10, scale: 2 }).notNull(),
  byproductQuantity: decimal("byproduct_quantity", { precision: 10, scale: 2 }),
  byproductName: text("byproduct_name"),
});

export const insertProductionSchema = createInsertSchema(production).omit({ 
  id: true, 
  date: true 
});
export type InsertProduction = z.infer<typeof insertProductionSchema>;
export type Production = typeof production.$inferSelect;

// Byproduct Sales
export const byproductSales = pgTable("byproduct_sales", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invoiceNumber: text("invoice_number").notNull().unique(),
  productName: text("product_name").notNull(),
  customerName: text("customer_name").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
});

export const insertByproductSaleSchema = createInsertSchema(byproductSales).omit({ 
  id: true, 
  invoiceNumber: true, 
  date: true 
});
export type InsertByproductSale = z.infer<typeof insertByproductSaleSchema>;
export type ByproductSale = typeof byproductSales.$inferSelect;
