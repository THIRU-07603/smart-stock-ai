import {
  LayoutDashboard,
  TrendingUp,
  Package,
  AlertTriangle,
  Clock,
  RefreshCcw,
  Store,
  Boxes,
  BarChart3,
  Bot,
  Bell,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "forecast", label: "Demand Forecast", icon: TrendingUp },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "stockout", label: "Stockout Risk", icon: AlertTriangle },
  { id: "slow-moving", label: "Slow-Moving & Overstock", icon: Clock },
  { id: "reorder", label: "Reorder Recommendations", icon: RefreshCcw },
  { id: "stores", label: "Stores", icon: Store },
  { id: "products", label: "Products / SKUs", icon: Boxes },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "assistant", label: "AI Assistant", icon: Bot },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "purchase-orders", label: "Purchase Orders", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900">SmartStock AI</h1>
            <p className="text-xs text-slate-500">Inventory Intelligence</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                currentPage === item.id
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-100">
        <div className="bg-emerald-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-emerald-800">AI Assistant</p>
          <p className="text-xs text-emerald-600 mt-1">Ask about your inventory</p>
          <button
            onClick={() => onNavigate("assistant")}
            className="mt-3 w-full bg-emerald-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Open Assistant
          </button>
        </div>
      </div>
    </aside>
  );
}