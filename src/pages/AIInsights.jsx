import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

function AIInsights() {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    generateInsights();
  }, []);

  async function generateInsights() {
    const suggestions = [];

    // Fetch orders
    const { data: orders } = await supabase
      .from("orders")
      .select("quantity, products(name)");

    // Fetch wastage
    const { data: wastage } = await supabase
      .from("wastage")
      .select("quantity, ingredients(name)");

    // 🔹 Best selling products
    const productSales = {};
    orders?.forEach(o => {
      const name = o.products.name;
      productSales[name] = (productSales[name] || 0) + o.quantity;
    });

    const bestSeller = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])[0];

    if (bestSeller) {
      suggestions.push({
        type: "success",
        message: `🔥 ${bestSeller[0]} is your best-selling product. Consider promoting it more.`
      });
    }

    // 🔹 High wastage ingredients
    const wastageMap = {};
    wastage?.forEach(w => {
      const name = w.ingredients.name;
      wastageMap[name] = (wastageMap[name] || 0) + w.quantity;
    });

    Object.entries(wastageMap).forEach(([name, qty]) => {
      if (qty > 200) {
        suggestions.push({
          type: "warning",
          message: `⚠️ High wastage detected for ${name}. Review storage or reduce procurement.`
        });
      }
    });

    setInsights(suggestions);
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>AI Insights</h1>

        {insights.length === 0 && <p>No insights yet.</p>}

        {insights.map((i, index) => (
          <div
            key={index}
            style={{
              background: i.type === "warning" ? "#ffe5e5" : "#e6fffa",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            {i.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIInsights;
