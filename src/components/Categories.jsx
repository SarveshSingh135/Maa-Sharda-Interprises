export default function Categories() {
  return (
    <section className="categories">
      <h2>Our Categories</h2>

      <div className="category-grid">

        <div className="card">
          <h3>📺 Electronics</h3>
          <p>
            LED TV, Inverter,
            Sound System, Accessories
          </p>
        </div>

        <div className="card">
          <h3>🛋 Furniture</h3>
          <p>
            Sofa, Bed,
            Table, Chair
          </p>
        </div>

        <div className="card">
          <h3>❄ Home Appliances</h3>
          <p>
            Fridge, AC,
            Washing Machine, Fan
          </p>
        </div>

      </div>
    </section>
  );
}