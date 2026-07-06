export default function Brands() {
  const brands = [
    "Samsung",
    "LG",
    "Whirlpool",
    "Godrej",
    "Philips",
    "Havells",
  ];

  return (
    <section className="brands">
      <h2>Trusted Brands</h2>

      <div className="brands-grid">
        {brands.map((brand, index) => (
          <div key={index} className="brand-card">
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}