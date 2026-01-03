import { useLocation, Link } from "react-router-dom";
import "../styles/main.css";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (p) => (path === p ? "active" : "");

  return (
    <div className="sidebar">
      <div className="logo">
        Smart<span>Café</span>.
      </div>

      <nav>
        <Link to="/" className={isActive("/")}>
          Dashboard
        </Link>
        <Link to="/orders" className={isActive("/orders")}>
          Orders & Menu
        </Link>
        <Link to="/inventory" className={isActive("/inventory")}>
          Inventory
        </Link>
        <Link to="/wastage" className={isActive("/wastage")}>
          Wastage Tracking
        </Link>
        <Link to="/analytics" className={isActive("/analytics")}>
          Analytics
        </Link>
        <Link to="/ai" className={isActive("/ai")}>
          ✨ AI Insights
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;