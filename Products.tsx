import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { Search } from "lucide-react";

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Dairy", "Bakery", "Beverages", "Snacks", "Groceries", "Personal Care", "Household", "Frozen Foods", "Fruits & Vegetables"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Products / SKU Management</h1>
        <p className="text-slate-500 mt-1">Manage your product catalog and SKU information.</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog ({filteredProducts.length} products)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">SKU</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Brand</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Store</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500">Supplier</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Lead Time</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Daily Demand</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-500">Reorder Point</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4 text-slate-500">{product.sku}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-4">{product.brand}</td>
                    <td className="py-3 px-4 text-right">₹{product.price}</td>
                    <td className="py-3 px-4 text-right">{product.currentStock}</td>
                    <td className="py-3 px-4">{product.store}</td>
                    <td className="py-3 px-4">{product.supplier}</td>
                    <td className="py-3 px-4 text-right">{product.leadTime} days</td>
                    <td className="py-3 px-4 text-right">{product.dailyDemand}</td>
                    <td className="py-3 px-4 text-right">{product.reorderPoint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}