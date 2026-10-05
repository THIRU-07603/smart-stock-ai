import { products, historicalSales, type Product } from "@/lib/data";

export interface DemandPrediction {
  product: Product;
  historical: number[];
  predicted: number[];
  averageDailyDemand: number;
  predictedTomorrow: number;
  predictedNext7Days: number;
  confidence: number;
  trend: "increasing" | "decreasing" | "stable";
}

export interface StockoutRisk {
  product: Product;
  daysOfInventory: number;
  stockoutProbability: number;
  expectedStockoutTime: string;
  risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  recommendedAction: string;
}

export interface SlowMovingProduct {
  product: Product;
  daysOfInventory: number;
  inventoryValue: number;
  status: "Slow Moving" | "Normal";
}

export interface OverstockProduct {
  product: Product;
  expectedDemand: number;
  excessQuantity: number;
  moneyLocked: number;
  recommendation: string;
}

export interface ReorderRecommendation {
  product: Product;
  forecastDemand: number;
  safetyStock: number;
  reorderPoint: number;
  recommendedOrderQuantity: number;
  explanation: string;
}

export function predictDemand(product: Product, days: number = 7): DemandPrediction {
  const history = historicalSales[product.sku] || Array.from({ length: 90 }, () => product.dailyDemand);
  const recent = history.slice(-30);
  
  // Calculate 7-day moving average
  const movingAverage = recent.slice(-7).reduce((sum, val) => sum + val, 0) / 7;
  
  // Calculate trend
  const firstHalf = recent.slice(0, 15).reduce((sum, val) => sum + val, 0) / 15;
  const secondHalf = recent.slice(-15).reduce((sum, val) => sum + val, 0) / 15;
  const trend = (secondHalf - firstHalf) / firstHalf;
  
  // Day of week adjustment (weekend boost)
  const dayOfWeek = new Date().getDay();
  const weekendBoost = dayOfWeek >= 5 ? 1.15 : 1.0;
  
  // Seasonality factor
  const seasonality = 1 + Math.sin((new Date().getMonth() / 12) * 2 * Math.PI) * 0.1;
  
  // Generate predictions
  const predicted: number[] = [];
  let currentBase = movingAverage * (1 + trend * 0.5);
  
  for (let i = 0; i < days; i++) {
    const dayFactor = (i + dayOfWeek) % 7 >= 5 ? weekendBoost : 1;
    const prediction = Math.round(currentBase * dayFactor * seasonality);
    predicted.push(prediction);
    currentBase = currentBase * (1 + trend * 0.1);
  }
  
  const averageDailyDemand = Math.round(movingAverage);
  const predictedTomorrow = predicted[0];
  const predictedNext7Days = predicted.slice(0, 7).reduce((sum, val) => sum + val, 0);
  
  // Confidence based on data consistency
  const variance = recent.reduce((sum, val) => sum + Math.pow(val - movingAverage, 2), 0) / recent.length;
  const confidence = Math.max(60, Math.min(95, 95 - variance / movingAverage));
  
  return {
    product,
    historical: history,
    predicted,
    averageDailyDemand,
    predictedTomorrow,
    predictedNext7Days,
    confidence: Math.round(confidence),
    trend: trend > 0.05 ? "increasing" : trend < -0.05 ? "decreasing" : "stable",
  };
}

export function calculateStockoutRisk(product: Product): StockoutRisk {
  const daysOfInventory = product.currentStock / product.dailyDemand;
  const leadTime = product.leadTime;
  
  // Calculate stockout probability based on days of inventory vs lead time
  let stockoutProbability: number;
  if (daysOfInventory <= 0) {
    stockoutProbability = 100;
  } else if (daysOfInventory <= leadTime * 0.5) {
    stockoutProbability = 90 + (leadTime * 0.5 - daysOfInventory) * 20;
  } else if (daysOfInventory <= leadTime) {
    stockoutProbability = 70 + (leadTime - daysOfInventory) * 20;
  } else if (daysOfInventory <= leadTime * 1.5) {
    stockoutProbability = 40 + (leadTime * 1.5 - daysOfInventory) * 20;
  } else if (daysOfInventory <= leadTime * 2) {
    stockoutProbability = 20 + (leadTime * 2 - daysOfInventory) * 10;
  } else {
    stockoutProbability = Math.max(5, 20 - (daysOfInventory - leadTime * 2) * 2);
  }
  
  stockoutProbability = Math.max(0, Math.min(100, Math.round(stockoutProbability)));
  
  let risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  if (stockoutProbability >= 85) {
    risk = "CRITICAL";
  } else if (stockoutProbability >= 60) {
    risk = "HIGH";
  } else if (stockoutProbability >= 30) {
    risk = "MEDIUM";
  } else {
    risk = "LOW";
  }
  
  const expectedStockoutTime = daysOfInventory <= 0 
    ? "Already stocked out" 
    : `~${Math.floor(daysOfInventory * 24)} hours`;
  
  let recommendedAction: string;
  switch (risk) {
    case "CRITICAL":
      recommendedAction = "Place emergency order immediately";
      break;
    case "HIGH":
      recommendedAction = "Place order within 24 hours";
      break;
    case "MEDIUM":
      recommendedAction = "Monitor and prepare reorder";
      break;
    default:
      recommendedAction = "No action needed";
  }
  
  return {
    product,
    daysOfInventory,
    stockoutProbability,
    expectedStockoutTime,
    risk,
    recommendedAction,
  };
}

export function detectSlowMoving(products: Product[]): SlowMovingProduct[] {
  return products
    .filter(p => p.dailyDemand < 5 && p.currentStock > 50)
    .map(p => ({
      product: p,
      daysOfInventory: p.currentStock / p.dailyDemand,
      inventoryValue: p.price * p.currentStock,
      status: "Slow Moving" as const,
    }));
}

export function detectOverstock(products: Product[]): OverstockProduct[] {
  return products
    .filter(p => p.currentStock > p.reorderPoint * 2)
    .map(p => {
      const expectedDemand = p.dailyDemand * 14; // 14 days expected demand
      const excessQuantity = Math.max(0, p.currentStock - expectedDemand);
      return {
        product: p,
        expectedDemand,
        excessQuantity,
        moneyLocked: excessQuantity * p.price,
        recommendation: excessQuantity > 500 
          ? "Reduce future orders and consider promotion" 
          : "Reduce future orders",
      };
    });
}

export function calculateReorderQuantity(product: Product): ReorderRecommendation {
  const forecastDemand = product.dailyDemand * product.leadTime;
  const safetyStock = product.safetyStock;
  const reorderPoint = forecastDemand + safetyStock;
  const recommendedOrderQuantity = Math.max(
    reorderPoint - product.currentStock + product.dailyDemand * 3,
    product.dailyDemand * 3
  );
  
  const explanation = `${product.name} demand is expected to ${product.dailyDemand > 50 ? "increase" : "remain stable"} and supplier lead time is ${product.leadTime} days. Recommended order: ${recommendedOrderQuantity} units.`;
  
  return {
    product,
    forecastDemand,
    safetyStock,
    reorderPoint,
    recommendedOrderQuantity: Math.round(recommendedOrderQuantity),
    explanation,
  };
}

export function recommendStockTransfer(fromStore: string, toStore: string, product: Product, quantity: number) {
  return {
    from: fromStore,
    to: toStore,
    product: product.name,
    quantity,
    reason: `${toStore} has low stock of ${product.name}, while ${fromStore} has excess inventory`,
  };
}