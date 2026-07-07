import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const heroBanner =
  localStorage.getItem("heroBanner") || "/maa bg.jpeg";

  return (
    <section
  className="hero"
  style={{
    backgroundImage: `url(${heroBanner})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="title">
          Maa Sharda Enterprises
        </h1>

        <h2 className="tagline">
          Style, Comfort & Trust — Sab Kuch Ek Hi Jagah
        </h2>

        <h3 className="category">
          Electronics | Furniture | Home Appliances
        </h3>

        <p className="delivery">
          🚚 Home Delivery Available
        </p>

        <div className="button-container">
          <button
            className="shop-btn"
            onClick={() => navigate("/products")}
          >
            🛒 Shop Now
          </button>

          <button
            className="contact-btn"
            onClick={() => navigate("/contact")}
          >
            📞 Contact Us
          </button>
        </div>
      </div>

      <a
        href="https://wa.me/919118239297"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
      >
        WhatsApp Now
      </a>
    </section>
  );
}