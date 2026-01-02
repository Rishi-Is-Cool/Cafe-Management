import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Charts() {
  const [dailySales, setDailySales] = useState([]);
  const [wastageData, setWastageData] = useState([]);

  useEffect(() => {
    fetchDailySales();
    fetchWastage();
  }, []);

  async function fetchDailySales() {
    const { data } = await supabase
      .from("orders")
      .select("created_at, total_price");

    const grouped = {};

    data?.forEach(o => {
      const date = new Date(o.created_at).toLocaleDateString();
      grouped[date] = (grouped[date] || 0) + Number(o.total_price);
    });

    const chartData = Object.keys(grouped).map(d => ({
      date: d,
      sales: grouped[d]
    }));

    setDailySales(chartData);
  }

  async function fetchWastage() {
    const { data } = await supabase
      .from("wastage")
      .select("quantity, ingredients(name)");

    const grouped = {};

    data?.forEach(w => {
      const name = w.ingredients.name;
      grouped[name] = (grouped[name] || 0) + Number(w.quantity);
    });

    const chartData = Object.keys(grouped).map(k => ({
      ingredient: k,
      wasted: grouped[k]
    }));

    setWastageData(chartData);
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Analytics</h1>

        <h3>Daily Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailySales}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" />
          </LineChart>
        </ResponsiveContainer>

        <h3 style={{ marginTop: "40px" }}>Wastage by Ingredient</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={wastageData}>
            <XAxis dataKey="ingredient" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="wasted" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
