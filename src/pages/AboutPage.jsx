import "../App.css";

export default function AboutPage() {
  return (
    <section className="about-page">

      <div className="about-container">


        <h1>About Maa Sharda Enterprises</h1>

        <p>
          Maa Sharda Enterprises is a trusted store for
          Electronics, Furniture, Home Appliances and
          Electrical Products.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h2>10+</h2>
            <p>Years Experience</p>
          </div>

          <div className="about-card">
            <h2>1000+</h2>
            <p>Happy Customers</p>
          </div>

          <div className="about-card">
            <h2>100%</h2>
            <p>Genuine Products</p>
          </div>

          <div className="about-card">
            <h2>24/7</h2>
            <p>Customer Support</p>
          </div>

        </div>

      </div>

    </section>
  );
}