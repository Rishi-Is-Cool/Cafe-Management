import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { supabase } from "../services/supabaseClient";

// Helper for realistic images
const getCategoryImg = (category) => {
  const images = {
    "Coffee": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
    "Frappuccino": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80",
    "Brewed Coffee": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    "Bakery": "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80",
    "Other Beverages": "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
    "default": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
  };
  return images[category] || images["default"];
};

// ---------------------------------------------------------
// Sub-Component: ProductCard (Handles its own quantity state)
// ---------------------------------------------------------
function ProductCard({ product, onOrder }) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="glass-card product-card">
      <img 
        src={getCategoryImg(product.category)} 
        alt={product.name} 
        className="product-image" 
      />
      
      <div className="product-info">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
          <h3>{product.name}</h3>
          <span className="price-tag">₹{product.price}</span>
        </div>
        <p>{product.category} • {product.calories || '0'} cal</p>
      </div>

      {/* Quantity Control Section */}
      <div className="quantity-controls">
        <button 
          type="button" 
          className="qty-btn" 
          onClick={decrement}
          disabled={quantity <= 1}
        >
          −
        </button>
        <span className="qty-display">{quantity}</span>
        <button 
          type="button" 
          className="qty-btn" 
          onClick={increment}
        >
          +
        </button>
      </div>

      {/* Place Order Button with Dynamic Price */}
      <button 
        className="btn-primary" 
        onClick={() => onOrder(product, quantity)}
      >
        Place Order • ₹{totalPrice}
      </button>
    </div>
  );
}

// ---------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------
function Orders() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  }

  async function handleOrder(product, qty) {
    const total = product.price * qty;
    const confirmMessage = `Confirm Order:\n\n${qty} x ${product.name}\nTotal: ₹${total.toFixed(2)}`;
    
    if (!window.confirm(confirmMessage)) return;

    const { error } = await supabase.from("orders").insert([
      {
        product_id: product.id,
        quantity: qty,
        total_price: total
      }
    ]);

    if (error) {
      alert("Error placing order. Please try again.");
    } else {
      alert("✅ Order Placed Successfully!");
    }
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="content">
        <h1>Orders & Menu</h1>
        <p className="subtitle">Select items and quantity to place an instant order.</p>

        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOrder={handleOrder} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;