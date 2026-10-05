import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { calculateStockoutRisk } from "@/lib/inventory";
import { Search, Package } from "lucide-react";

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Dairy", "Bakery", "Beverages", "Snacks", "Groceries", "Personal Care", "Household", "Frozen Foods", "Fruits & Vegetables"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalValue = filteredProducts.reduce((sum, p) => sum + p.price * p.currentStock, 0);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Inventory</h1>
        <p className="text-slate-500 mt-1">Monitor your stock levels across all products.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-2xl font-bold mt-1">{filteredProducts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Total Inventory Value</p>
            <p className="text-2xl font-bold mt-1">₹{totalValue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Low Stock Items</p>
            <p className="text-2xl font-bold mt-1 text-red-600">
              {filteredProducts.filter(p => p.currentStock < p.reorderPoint).length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Category</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Stock</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Reorder Point</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const risk = calculateStockoutRisk(product);
                  return (
                    <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{product.sku}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right">₹{product.price}</td>
                      <td className="py-3 px-4 text-right font-medium">{product.currentStock}</td>
                      <td className="py-3 px-4 text-right">{product.reorderPoint}</td>
                      <td className="py-3 px-4">
                        <Badge className={
                          product.currentStock < product.reorderPoint ? "bg-red-600" :
                          product.currentStock < product.reorderPoint * 1.5 ? "bg-yellow-600" :
                          "bg-emerald-600"
                        }>
                          {product.currentStock < product.reorderPoint ? "Low Stock" :
                           product.currentStock < product.reorderPoint * 1.5 ? "Medium" : "Healthy"}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}