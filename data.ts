export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  currentStock: number;
  store: string;
  supplier: string;
  leadTime: number;
  dailyDemand: number;
  reorderPoint: number;
  safetyStock: number;
  lastSale: number;
  isPerishable: boolean;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  inventoryValue: number;
  skuCount: number;
  lowStock: number;
  stockoutRisk: number;
  overstock: number;
  todaySales: number;
}

export const stores: Store[] = [
  { id: "1", name: "Anna Nagar", location: "Chennai", inventoryValue: 2450000, skuCount: 1200, lowStock: 45, stockoutRisk: 12, overstock: 8, todaySales: 185000 },
  { id: "2", name: "Adyar", location: "Chennai", inventoryValue: 1980000, skuCount: 1100, lowStock: 38, stockoutRisk: 9, overstock: 6, todaySales: 152000 },
  { id: "3", name: "Velachery", location: "Chennai", inventoryValue: 1750000, skuCount: 1050, lowStock: 32, stockoutRisk: 7, overstock: 5, todaySales: 128000 },
  { id: "4", name: "T. Nagar", location: "Chennai", inventoryValue: 2200000, skuCount: 1150, lowStock: 41, stockoutRisk: 10, overstock: 7, todaySales: 168000 },
  { id: "5", name: "Chennai Central", location: "Chennai", inventoryValue: 1600000, skuCount: 980, lowStock: 28, stockoutRisk: 6, overstock: 4, todaySales: 112000 },
];

export const products: Product[] = [
  { id: "1", name: "Milk 1L", sku: "MILK-AM-1L", category: "Dairy", brand: "Aavin", price: 28, currentStock: 80, store: "Anna Nagar", supplier: "Aavin Dairy", leadTime: 2, dailyDemand: 110, reorderPoint: 220, safetyStock: 50, lastSale: 0, isPerishable: true },
  { id: "2", name: "Milk 500ml", sku: "MILK-AM-500", category: "Dairy", brand: "Aavin", price: 15, currentStock: 150, store: "Anna Nagar", supplier: "Aavin Dairy", leadTime: 2, dailyDemand: 85, reorderPoint: 170, safetyStock: 40, lastSale: 0, isPerishable: true },
  { id: "3", name: "Bread 400g", sku: "BREAD-BR-400", category: "Bakery", brand: "Britannia", price: 35, currentStock: 60, store: "Anna Nagar", supplier: "Britannia", leadTime: 1, dailyDemand: 95, reorderPoint: 95, safetyStock: 20, lastSale: 0, isPerishable: true },
  { id: "4", name: "Eggs 12-pack", sku: "EGGS-12", category: "Dairy", brand: "Country Eggs", price: 72, currentStock: 100, store: "Anna Nagar", supplier: "Country Eggs", leadTime: 1, dailyDemand: 80, reorderPoint: 80, safetyStock: 20, lastSale: 0, isPerishable: true },
  { id: "5", name: "Peanut Butter 340g", sku: "PB-ALM-340", category: "Snacks", brand: "Almond", price: 245, currentStock: 100, store: "Anna Nagar", supplier: "Almond Foods", leadTime: 5, dailyDemand: 2, reorderPoint: 10, safetyStock: 5, lastSale: 2, isPerishable: false },
  { id: "6", name: "Rice 5kg", sku: "RICE-5KG", category: "Groceries", brand: "India Gate", price: 450, currentStock: 200, store: "Anna Nagar", supplier: "India Gate", leadTime: 3, dailyDemand: 15, reorderPoint: 45, safetyStock: 10, lastSale: 0, isPerishable: false },
  { id: "7", name: "Cooking Oil 1L", sku: "OIL-1L", category: "Groceries", brand: "Fortune", price: 145, currentStock: 300, store: "Anna Nagar", supplier: "Fortune", leadTime: 4, dailyDemand: 25, reorderPoint: 100, safetyStock: 20, lastSale: 0, isPerishable: false },
  { id: "8", name: "Premium Biscuits 200g", sku: "BISC-200", category: "Snacks", brand: "Parle", price: 40, currentStock: 1200, store: "Anna Nagar", supplier: "Parle", leadTime: 3, dailyDemand: 20, reorderPoint: 60, safetyStock: 15, lastSale: 0, isPerishable: false },
  { id: "9", name: "Curd 400g", sku: "CURD-400", category: "Dairy", brand: "Aavin", price: 25, currentStock: 90, store: "Anna Nagar", supplier: "Aavin Dairy", leadTime: 1, dailyDemand: 70, reorderPoint: 70, safetyStock: 15, lastSale: 0, isPerishable: true },
  { id: "10", name: "Paneer 200g", sku: "PAN-200", category: "Dairy", brand: "Amul", price: 85, currentStock: 45, store: "Anna Nagar", supplier: "Amul", leadTime: 2, dailyDemand: 40, reorderPoint: 80, safetyStock: 20, lastSale: 0, isPerishable: true },
  { id: "11", name: "Coca Cola 750ml", sku: "COKE-750", category: "Beverages", brand: "Coca Cola", price: 45, currentStock: 250, store: "Anna Nagar", supplier: "Coca Cola", leadTime: 2, dailyDemand: 35, reorderPoint: 70, safetyStock: 15, lastSale: 0, isPerishable: false },
  { id: "12", name: "Mineral Water 1L", sku: "WATER-1L", category: "Beverages", brand: "Kinley", price: 20, currentStock: 500, store: "Anna Nagar", supplier: "Kinley", leadTime: 1, dailyDemand: 60, reorderPoint: 60, safetyStock: 10, lastSale: 0, isPerishable: false },
  { id: "13", name: "Lays Chips 52g", sku: "LAYS-52", category: "Snacks", brand: "Lays", price: 20, currentStock: 400, store: "Anna Nagar", supplier: "PepsiCo", leadTime: 2, dailyDemand: 45, reorderPoint: 90, safetyStock: 20, lastSale: 0, isPerishable: false },
  { id: "14", name: "Maggi Noodles 70g", sku: "MAGGI-70", category: "Groceries", brand: "Nestle", price: 14, currentStock: 600, store: "Anna Nagar", supplier: "Nestle", leadTime: 2, dailyDemand: 55, reorderPoint: 110, safetyStock: 25, lastSale: 0, isPerishable: false },
  { id: "15", name: "Toothpaste 100g", sku: "TOOTH-100", category: "Personal Care", brand: "Colgate", price: 55, currentStock: 150, store: "Anna Nagar", supplier: "Colgate", leadTime: 4, dailyDemand: 8, reorderPoint: 32, safetyStock: 8, lastSale: 0, isPerishable: false },
  { id: "16", name: "Shampoo 180ml", sku: "SHAM-180", category: "Personal Care", brand: "Dove", price: 180, currentStock: 80, store: "Anna Nagar", supplier: "Unilever", leadTime: 5, dailyDemand: 5, reorderPoint: 25, safetyStock: 8, lastSale: 0, isPerishable: false },
  { id: "17", name: "Detergent 1kg", sku: "DET-1KG", category: "Household", brand: "Surf Excel", price: 120, currentStock: 200, store: "Anna Nagar", supplier: "HUL", leadTime: 3, dailyDemand: 12, reorderPoint: 36, safetyStock: 10, lastSale: 0, isPerishable: false },
  { id: "18", name: "Dishwash Liquid 500ml", sku: "DISH-500", category: "Household", brand: "Vim", price: 95, currentStock: 180, store: "Anna Nagar", supplier: "HUL", leadTime: 3, dailyDemand: 10, reorderPoint: 30, safetyStock: 8, lastSale: 0, isPerishable: false },
  { id: "19", name: "Frozen Peas 500g", sku: "FROZ-PEAS", category: "Frozen Foods", brand: "McCain", price: 85, currentStock: 60, store: "Anna Nagar", supplier: "McCain", leadTime: 4, dailyDemand: 6, reorderPoint: 24, safetyStock: 8, lastSale: 0, isPerishable: true },
  { id: "20", name: "Frozen Pizza 300g", sku: "FROZ-PIZZA", category: "Frozen Foods", brand: "McCain", price: 150, currentStock: 40, store: "Anna Nagar", supplier: "McCain", leadTime: 4, dailyDemand: 4, reorderPoint: 16, safetyStock: 6, lastSale: 0, isPerishable: true },
  { id: "21", name: "Onion 1kg", sku: "VEG-ONION", category: "Fruits & Vegetables", brand: "Fresh", price: 35, currentStock: 100, store: "Anna Nagar", supplier: "Fresh Farms", leadTime: 1, dailyDemand: 30, reorderPoint: 30, safetyStock: 10, lastSale: 0, isPerishable: true },
  { id: "22", name: "Tomato 1kg", sku: "VEG-TOMATO", category: "Fruits & Vegetables", brand: "Fresh", price: 25, currentStock: 80, store: "Anna Nagar", supplier: "Fresh Farms", leadTime: 1, dailyDemand: 35, reorderPoint: 35, safetyStock: 10, lastSale: 0, isPerishable: true },
  { id: "23", name: "Potato 1kg", sku: "VEG-POTATO", category: "Fruits & Vegetables", brand: "Fresh", price: 30, currentStock: 120, store: "Anna Nagar", supplier: "Fresh Farms", leadTime: 1, dailyDemand: 28, reorderPoint: 28, safetyStock: 8, lastSale: 0, isPerishable: true },
  { id: "24", name: "Apple 1kg", sku: "FRUIT-APPLE", category: "Fruits & Vegetables", brand: "Fresh", price: 180, currentStock: 50, store: "Anna Nagar", supplier: "Fresh Farms", leadTime: 2, dailyDemand: 12, reorderPoint: 24, safetyStock: 6, lastSale: 0, isPerishable: true },
  { id: "25", name: "Banana 1kg", sku: "FRUIT-BANANA", category: "Fruits & Vegetables", brand: "Fresh", price: 40, currentStock: 70, store: "Anna Nagar", supplier: "Fresh Farms", leadTime: 1, dailyDemand: 25, reorderPoint: 25, safetyStock: 8, lastSale: 0, isPerishable: true },
  { id: "26", name: "Butter 100g", sku: "BUTTER-100", category: "Dairy", brand: "Amul", price: 55, currentStock: 90, store: "Anna Nagar", supplier: "Amul", leadTime: 2, dailyDemand: 15, reorderPoint: 30, safetyStock: 8, lastSale: 0, isPerishable: true },
  { id: "27", name: "Cheese Slices 200g", sku: "CHEESE-200", category: "Dairy", brand: "Amul", price: 120, currentStock: 60, store: "Anna Nagar", supplier: "Amul", leadTime: 2, dailyDemand: 10, reorderPoint: 20, safetyStock: 6, lastSale: 0, isPerishable: true },
  { id: "28", name: "Orange Juice 1L", sku: "OJ-1L", category: "Beverages", brand: "Tropicana", price: 120, currentStock: 100, store: "Anna Nagar", supplier: "Tropicana", leadTime: 3, dailyDemand: 8, reorderPoint: 24, safetyStock: 6, lastSale: 0, isPerishable: false },
  { id: "29", name: "Chips - Large 150g", sku: "CHIPS-150", category: "Snacks", brand: "Lays", price: 50, currentStock: 300, store: "Anna Nagar", supplier: "PepsiCo", leadTime: 2, dailyDemand: 20, reorderPoint: 40, safetyStock: 10, lastSale: 0, isPerishable: false },
  { id: "30", name: "Instant Coffee 50g", sku: "COFFEE-50", category: "Beverages", brand: "Nescafe", price: 95, currentStock: 80, store: "Anna Nagar", supplier: "Nestle", leadTime: 3, dailyDemand: 6, reorderPoint: 18, safetyStock: 5, lastSale: 0, isPerishable: false },
];

export const historicalSales: Record<string, number[]> = {
  "MILK-AM-1L": Array.from({ length: 90 }, (_, i) => {
    const base = 95;
    const dayOfWeek = i % 7;
    const weekendBoost = dayOfWeek >= 5 ? 20 : 0;
    const trend = i * 0.2;
    const seasonality = Math.sin(i / 10) * 10;
    return Math.round(base + weekendBoost + trend + seasonality);
  }),
  "BREAD-BR-400": Array.from({ length: 90 }, (_, i) => {
    const base = 80;
    const dayOfWeek = i % 7;
    const weekendBoost = dayOfWeek >= 5 ? 15 : 0;
    const trend = i * 0.1;
    return Math.round(base + weekendBoost + trend);
  }),
  "EGGS-12": Array.from({ length: 90 }, (_, i) => {
    const base = 70;
    const dayOfWeek = i % 7;
    const weekendBoost = dayOfWeek >= 5 ? 10 : 0;
    return Math.round(base + weekendBoost);
  }),
  "PB-ALM-340": Array.from({ length: 90 }, (_, i) => {
    const base = 2;
    const occasional = i % 15 === 0 ? 3 : 0;
    return Math.round(base + occasional);
  }),
  "RICE-5KG": Array.from({ length: 90 }, (_, i) => {
    const base = 12;
    const monthly = i % 30 === 0 ? 8 : 0;
    return Math.round(base + monthly);
  }),
  "OIL-1L": Array.from({ length: 90 }, (_, i) => {
    const base = 20;
    const monthly = i % 30 === 0 ? 10 : 0;
    return Math.round(base + monthly);
  }),
  "BISC-200": Array.from({ length: 90 }, (_, i) => {
    const base = 15;
    const occasional = i % 20 === 0 ? 10 : 0;
    return Math.round(base + occasional);
  }),
};

export const seasonalFactors = {
  Diwali: { daysAway: 7, factors: { "Sweets": 1.45, "Dry Fruits": 1.38, "Cooking Oil": 1.25, "Snacks": 1.2, "Beverages": 1.15 } },
  Pongal: { daysAway: 30, factors: { "Rice": 1.3, "Cooking Oil": 1.2, "Groceries": 1.15, "Dairy": 1.1 } },
  Christmas: { daysAway: 45, factors: { "Bakery": 1.25, "Beverages": 1.2, "Snacks": 1.15, "Frozen Foods": 1.1 } },
  NewYear: { daysAway: 60, factors: { "Beverages": 1.3, "Snacks": 1.25, "Bakery": 1.2 } },
  Weekends: { daysAway: 0, factors: { "Dairy": 1.15, "Bakery": 1.2, "Beverages": 1.25, "Snacks": 1.3 } },
};