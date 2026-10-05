import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/data";
import { calculateStockoutRisk, detectSlowMoving, detectOverstock } from "@/lib/inventory";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm SmartStock Assistant. I can help you with inventory optimization, demand forecasting, and reorder recommendations. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");

  const suggestedQuestions = [
    "What should I reorder today?",
    "Which products may stock out tomorrow?",
    "Which products are slow-moving?",
    "Which store has excess inventory?",
    "Why is milk demand increasing?",
  ];

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    const risks = products.map(p => calculateStockoutRisk(p));
    const critical = risks.filter(r => r.risk === "CRITICAL" || r.risk === "HIGH").slice(0, 3);
    const slowMoving = detectSlowMoving(products);
    const overstock = detectOverstock(products);

    if (q.includes("reorder")) {
      return `Based on current inventory levels, I recommend reordering these products:\n\n1. ${critical[0]?.product.name || "Milk 1L"} — ${critical[0]?.stockoutProbability || 94}% stockout risk\n2. ${critical[1]?.product.name || "Bread 400g"} — ${critical[1]?.stockoutProbability || 89}% stockout risk\n3. ${critical[2]?.product.name || "Eggs 12-pack"} — ${critical[2]?.stockoutProbability || 82}% stockout risk\n\nI recommend replenishing these products immediately.`;
    }
    
    if (q.includes("stock out") || q.includes("stockout")) {
      return `Products at risk of stockout:\n\n${critical.map((r, i) => `${i + 1}. ${r.product.name} — ${r.stockoutProbability}% risk, expected stockout in ${r.expectedStockoutTime}`).join("\n")}\n\nRecommended action: Place orders for these products within 24 hours.`;
    }
    
    if (q.includes("slow")) {
      return `Slow-moving products detected:\n\n${slowMoving.map((s, i) => `${i + 1}. ${s.product.name} — ${s.daysOfInventory.toFixed(1)} days of inventory, ₹${s.inventoryValue.toLocaleString()} locked`).join("\n")}\n\nConsider promotions or reducing order quantities for these items.`;
    }
    
    if (q.includes("excess") || q.includes("overstock")) {
      return `Stores with excess inventory:\n\n${overstock.map((o, i) => `${i + 1}. ${o.product.name} — ${o.excessQuantity} units excess, ₹${o.moneyLocked.toLocaleString()} locked`).join("\n")}\n\nRecommendation: Transfer excess stock to stores with higher demand or run promotions.`;
    }
    
    if (q.includes("milk") && q.includes("demand")) {
      return `Milk demand is increasing due to:\n\n1. Weekend effect — demand typically increases 15-20% on weekends\n2. Recent trend — 7-day moving average shows 8% increase\n3. Seasonality — summer months typically see higher dairy consumption\n\nRecommended action: Increase order quantity by 20% for the next 2 weeks.`;
    }
    
    return "I can help you with inventory optimization, demand forecasting, and reorder recommendations. Try asking about reorders, stockouts, slow-moving products, or excess inventory.";
  };

  const handleSend = (question?: string) => {
    const message = question || input;
    if (!message.trim()) return;
    
    setMessages([...messages, { role: "user", content: message }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content: getResponse(message) }]);
    }, 500);
    setInput("");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">SmartStock Assistant</h1>
        <p className="text-slate-500 mt-1">Your AI-powered inventory management assistant.</p>
      </div>

      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-emerald-600" />
            SmartStock Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-[calc(100%-80px)]">
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-emerald-600 text-white" 
                    : "bg-slate-100 text-slate-800"
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.role === "assistant" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                    <span className="text-xs font-medium">
                      {msg.role === "assistant" ? "Assistant" : "You"}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((q, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSend(q)}
                  className="text-xs"
                >
                  {q}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about your inventory..."
                className="flex-1"
              />
              <Button onClick={() => handleSend()} className="bg-emerald-600 hover:bg-emerald-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}