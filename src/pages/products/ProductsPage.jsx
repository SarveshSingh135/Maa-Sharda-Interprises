import { useNavigate } from "react-router-dom";


export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="products-page">

      <h1>Our Products</h1>

      <div className="category-grid">
        <div onClick={() => navigate("/electronics")} className="card">
          <h2>📺 Electronics</h2>
          <p>LED TV, Sound System, Smart Devices</p>
        </div>

        <div onClick={() => navigate("/furniture")} className="card">
          <h2>🛋 Furniture</h2>
          <p>Sofa, Bed, Table, Chair</p>
        </div>

        <div onClick={() => navigate("/appliances")} className="card">
          <h2>❄ Appliances</h2>
          <p>AC, Fridge, Cooler, Washing Machine</p>
        </div>

        <div onClick={() => navigate("/electrical")} className="card">
          <h2>⚡ Electrical</h2>
          <p>Wire, Cable, MCB, Switch</p>
        </div>
      </div>
    </div>
  );
}