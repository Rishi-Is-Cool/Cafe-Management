import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";
import "../styles/main.css";

function Orders() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [todaySales, setTodaySales] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("id, name, price");
    setProducts(data || []);
  }

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select(`
        id,
        quantity,
        total_price,
        created_at,
        products ( name )
      `)
      .order("created_at", { ascending: false });

    if (data) {
      setOrders(data);

      // Calculate today's sales
      const today = new Date().toDateString();
      const total = data
        .filter(o => new Date(o.created_at).toDateString() === today)
        .reduce((sum, o) => sum + Number(o.total_price), 0);

      setTodaySales(total);
    }
  }

  async function placeOrder(e) {
    e.preventDefault();
    const product = products.find(p => p.id === productId);
    const total = product.price * quantity;

    await supabase.from("orders").insert([
      {
        product_id: productId,
        quantity,
        total_price: total
      }
    ]);

    setQuantity(1);
    fetchOrders();
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Orders</h1>

        <h3>Today's Sales: ₹ {todaySales.toFixed(2)}</h3>

        {/* Order Form */}
        <form onSubmit={placeOrder} style={{ marginBottom: "20px" }}>
          <select
            value={productId}
            onChange={e => setProductId(e.target.value)}
            required
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — ₹{p.price}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
          />

          <button type="submit">Place Order</button>
        </form>

        {/* Orders Table */}
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Total (₹)</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.products?.name}</td>
                <td>{o.quantity}</td>
                <td>{o.total_price}</td>
                <td>{new Date(o.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
