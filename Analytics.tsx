import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, stores } from "@/lib/data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function Analytics() {
  const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.currentStock, 0);
  const totalSales = stores.reduce((sum, s) => sum + s.todaySales, 0);
  const inventoryTurnover = (totalSales / totalInventoryValue) * 30;
  const stockoutRate = 12.5;
  const overstockValue = products.filter(p => p.currentStock > p.reorderPoint * 2).reduce((sum, p) => sum + p.price * (p.currentStock - p.reorderPoint * 2), 0);
  const slowMovingValue = products.filter(p => p.dailyDemand < 5 && p.currentStock > 50).reduce((sum, p) => sum + p.price * p.currentStock, 0);
  const forecastAccuracy = 87.5;
  const avgDaysOfInventory = 18.5;

  const salesTrend = [
    { month: "Jan", sales: 4200000 },
    { month: "Feb", sales: 4500000 },
    { month: "Mar", sales: 4800000 },
    { month: "Apr", sales: 5100000 },
    { month: "May", sales: 5400000 },
    { month: "Jun", sales: 5800000 },
  ];

  const inventoryValue = [
    { month: "Jan", value: 1800000 },
    { month: "Feb", value: 1900000 },
    { month: "Mar", value: 2000000 },
    { month: "Apr", value: 2100000 },
    { month: "May", value: 2200000 },
    { month: "Jun", value: 2300000 },
  ];

  const categoryData = [
    { name: "Dairy", value: 30 },
    { name: "Bakery", value: 15 },
    { name: "Beverages", value: 20 },
    { name: "Snacks", value: 15 },
    { name: "Groceries", value: 20 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Comprehensive analytics and performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Inventory Turnover</p>
            <p className="text-2xl font-bold mt-1">{inventoryTurnover.toFixed(1)}x</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Stockout Rate</p>
            <p className="text-2xl font-bold text-red-600 mt-1">{stockoutRate}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Forecast Accuracy</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{forecastAccuracy}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Avg Days of Inventory</p>
            <p className="text-2xl font-bold mt-1">{avgDaysOfInventory} days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryValue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500">Overstock Value</span>
              <span className="font-medium text-red-600">₹{overstockValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500">Slow-Moving Inventory Value</span>
              <span className="font-medium text-orange-500">₹{slowMovingValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500">Total Inventory Value</span>
              <span className="font-medium">₹{totalInventoryValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-500">Monthly Sales</span>
              <span className="font-medium text-emerald-600">₹{totalSales.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}