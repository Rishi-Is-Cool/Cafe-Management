import "../styles/main.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Smart Café</h2>

      <nav>
        <a href="/">Dashboard</a>
        <a href="/orders">Orders</a>
        <a href="/wastage">Wastage</a>
        <a href="/inventory">Inventory</a>
        <a href="/analytics">Analytics</a>
        <a href="/ai">AI Insights</a>
      </nav>
    </div>
  );
}

export default Sidebar;
