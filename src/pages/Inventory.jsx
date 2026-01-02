import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

function Inventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    const { data } = await supabase.from("ingredients").select("*");
    setItems(data || []);
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Inventory</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Stock</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.stock}</td>
                <td>{i.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
