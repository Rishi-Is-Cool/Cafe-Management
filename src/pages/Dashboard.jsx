import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, avgPrice: 0 });
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: products } = await supabase.from("products").select("*");
      
      if (products) {
        const uniqueCats = [...new Set(products.map(p => p.category))];
        const avg = products.reduce((sum, p) => sum + Number(p.price), 0) / (products.length || 1);
        
        setStats({
          products: products.length,
          categories: uniqueCats.length,
          avgPrice: avg.toFixed(0)
        });
        setRecentProducts(products.slice(0, 8));
      }
    }
    fetchData();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Dashboard</h1>
        <p className="subtitle">Welcome back, Manager.</p>

        <div className="stats-grid">
          <div className="glass-card">
            <div className="stat-title">Total Products</div>
            <div className="stat-value">{stats.products}</div>
          </div>
          <div className="glass-card">
            <div className="stat-title">Categories</div>
            <div className="stat-value">{stats.categories}</div>
          </div>
          <div className="glass-card">
            <div className="stat-title">Avg. Price</div>
            <div className="stat-value">₹ {stats.avgPrice}</div>
          </div>
          <div className="glass-card" style={{border: '1px solid var(--primary-green)'}}>
            <div className="stat-title" style={{color: 'var(--primary-green)'}}>System Status</div>
            <div className="stat-value" style={{color: 'var(--primary-green)', fontSize: '1.5rem'}}>Online 🟢</div>
          </div>
        </div>

        <h2 style={{marginTop: '40px', marginBottom: '20px'}}>Menu Overview</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Calories</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {recentProducts.map(p => (
                <tr key={p.id}>
                  <td style={{fontWeight: '500'}}>{p.name}</td>
                  <td>
                    <span style={{
                      background: 'rgba(255,255,255,0.1)', 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '0.85rem'
                    }}>
                      {p.category}
                    </span>
                  </td>
                  <td>{p.calories || "N/A"}</td>
                  <td>₹ {p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;