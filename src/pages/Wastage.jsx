import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

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

    await supabase.from("wastage").insert([
      {
        ingredient_id: ingredientId,
        quantity,
        reason
      }
    ]);

    alert("Wastage recorded");
    setQuantity("");
    setReason("");
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Wastage</h1>

        <form onSubmit={addWastage}>
          <select
            value={ingredientId}
            onChange={e => setIngredientId(e.target.value)}
            required
          >
            <option value="">Select Ingredient</option>
            {ingredients.map(i => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity wasted"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            required
          />

          <input
            type="text"
            placeholder="Reason (spoilage / spill)"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />

          <button type="submit">Record Wastage</button>
        </form>
      </div>
    </div>
  );
}

export default Wastage;
