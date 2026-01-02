import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Wastage from "./pages/Wastage";
import Charts from "./pages/Charts";
import AIInsights from "./pages/AIInsights";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wastage" element={<Wastage />} />
        <Route path="/analytics" element={<Charts />} />
        <Route path="/ai" element={<AIInsights />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
