import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";
import "../styles/main.css"; // Ensure CSS is imported

function Wastage() {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    fetchIngredients();
  }, []);

  async function fetchIngredients() {
    const { data } = await supabase.from("ingredients").select("id, name, unit");
    setIngredients(data || []);
  }

  async function addWastage(e) {
    e.preventDefault();
    if (!ingredientId || !quantity) return;

    const { error } = await supabase.from("wastage").insert([
      {
        ingredient_id: ingredientId,
        quantity,
        reason
      }
    ]);

    if (error) {
      alert("Error recording wastage");
    } else {
      alert("Wastage recorded successfully");
      setQuantity("");
      setReason("");
      setIngredientId("");
    }
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Wastage Tracking</h1>
        <p className="subtitle">Log spoiled or spilled inventory to track losses.</p>

        <div style={{ maxWidth: "600px" }}>
          <div className="glass-card">
            <form onSubmit={addWastage}>
              
              <div className="form-group">
                <label className="form-label">Select Ingredient</label>
                <select
                  className="glass-input"
                  value={ingredientId}
                  onChange={e => setIngredientId(e.target.value)}
                  required
                >
                  <option value="">-- Choose an Item --</option>
                  {ingredients.map(i => (
                    <option key={i.id} value={i.id}>
                      {i.name} ({i.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Quantity Wasted</label>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="e.g. 500"
                  value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reason</label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Spilled, Expired, Burnt"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: "10px" }}>
                Record Wastage
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wastage;