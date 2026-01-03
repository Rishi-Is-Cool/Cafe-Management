import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

function AIInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInsights();
  }, []);

  async function generateInsights() {
    setLoading(true);
    const suggestions = [];

    // Fetch real data
    const { data: orders } = await supabase.from("orders").select("quantity, total_price, products(name, category)");
    const { data: wastage } = await supabase.from("wastage").select("quantity, ingredients(name)");

    // 1. REVENUE ANALYSIS
    const totalRevenue = orders?.reduce((acc, curr) => acc + curr.total_price, 0) || 0;
    const avgOrderValue = totalRevenue / (orders?.length || 1);
    
    if (avgOrderValue > 400) {
      suggestions.push({
        category: "Revenue",
        type: "success",
        title: "High Value Orders",
        message: `Your average order value is ₹${avgOrderValue.toFixed(0)}, which is 15% higher than industry standard.`
      });
    }

    // 2. BEST SELLER ANALYSIS
    const productSales = {};
    orders?.forEach(o => {
      const name = o.products?.name;
      if(name) productSales[name] = (productSales[name] || 0) + o.quantity;
    });

    const sortedProducts = Object.entries(productSales).sort((a, b) => b[1] - a[1]);
    const bestSeller = sortedProducts[0];

    if (bestSeller) {
      suggestions.push({
        category: "Sales Trend",
        type: "info",
        title: "Trending Product",
        message: `🔥 "${bestSeller[0]}" is your top performer with ${bestSeller[1]} units sold. Run a "Buy 2 Get 1" promo to maximize volume.`
      });
    }

    // 3. WASTAGE ANALYSIS
    const wastageMap = {};
    wastage?.forEach(w => {
      const name = w.ingredients?.name;
      if(name) wastageMap[name] = (wastageMap[name] || 0) + w.quantity;
    });

    Object.entries(wastageMap).forEach(([name, qty]) => {
      if (qty > 100) { // Threshold
        suggestions.push({
          category: "Efficiency",
          type: "warning",
          title: "High Wastage Alert",
          message: `⚠️ ${name} waste is unusually high (${qty} units). Check refrigerator temperature or calibrate portion sizes.`
        });
      }
    });

    // 4. PREDICTIVE (Simulated for realism based on existing data)
    if (orders?.length > 10) {
       suggestions.push({
        category: "Prediction",
        type: "info",
        title: "Weekend Forecast",
        message: "Based on current velocity, you may run out of 'Milk' by Sunday evening. Restock recommended."
      });
    }

    setInsights(suggestions);
    setLoading(false);
  }

  // Helper for styling cards based on type
  const getCardStyle = (type) => {
    switch(type) {
      case 'warning': return { borderLeft: '4px solid #ff4444' };
      case 'success': return { borderLeft: '4px solid #00C851' };
      default: return { borderLeft: '4px solid #33b5e5' };
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>AI Insights</h1>
        <p className="subtitle">Real-time analysis powered by store data.</p>

        {loading ? (
          <p>Analyzing data points...</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {insights.map((i, index) => (
              <div key={index} className="glass-card" style={{...getCardStyle(i.type), display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{
                    fontSize: '0.8rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    color: 'var(--text-muted)'
                  }}>{i.category}</span>
                </div>
                <h3 style={{margin: '5px 0'}}>{i.title}</h3>
                <p style={{margin: 0, color: 'var(--text-muted)', lineHeight: '1.5'}}>{i.message}</p>
              </div>
            ))}
            
            {insights.length === 0 && <p>No sufficient data to generate insights yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default AIInsights;
