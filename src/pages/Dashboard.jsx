import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { supabase } from "../services/supabaseClient";
import "../styles/main.css";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (!error) setProducts(data);
    }

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(p => p.category))];
  const avgPrice =
    products.reduce((sum, p) => sum + Number(p.price), 0) /
    (products.length || 1);

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Dashboard</h1>

        <div className="stats">
          <StatCard title="Total Products" value={products.length} />
          <StatCard title="Categories" value={categories.length} />
          <StatCard title="Avg Price" value={`₹ ${avgPrice.toFixed(2)}`} />
        </div>

        <h2 style={{ marginTop: "30px" }}>Menu Preview</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Calories</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 10).map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.calories ?? "-"}</td>
                <td>₹ {p.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
