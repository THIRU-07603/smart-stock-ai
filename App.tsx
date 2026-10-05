import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/pages/Dashboard";
import { DemandForecast } from "@/pages/DemandForecast";
import { Inventory } from "@/pages/Inventory";
import { StockoutRisk } from "@/pages/StockoutRisk";
import { SlowMovingOverstock } from "@/pages/SlowMovingOverstock";
import { ReorderRecommendations } from "@/pages/ReorderRecommendations";
import { Stores } from "@/pages/Stores";
import { Products } from "@/pages/Products";
import { Analytics } from "@/pages/Analytics";
import { AIAssistant } from "@/pages/AIAssistant";
import { Alerts } from "@/pages/Alerts";
import { PurchaseOrders } from "@/pages/PurchaseOrders";
import { Settings } from "@/pages/Settings";
import { Toaster } from "sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentPage} />;
      case "forecast":
        return <DemandForecast />;
      case "inventory":
        return <Inventory />;
      case "stockout":
        return <StockoutRisk />;
      case "slow-moving":
        return <SlowMovingOverstock />;
      case "reorder":
        return <ReorderRecommendations />;
      case "stores":
        return <Stores />;
      case "products":
        return <Products />;
      case "analytics":
        return <Analytics />;
      case "assistant":
        return <AIAssistant />;
      case "alerts":
        return <Alerts />;
      case "purchase-orders":
        return <PurchaseOrders />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-y-auto">
        {renderPage()}
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}