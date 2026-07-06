import { useNavigate } from "react-router-dom";

export default function ContactSection() {

  const navigate = useNavigate();

  return (
    <section className="contact-section">

      <h2>Need Help?</h2>

      <p>
        Contact Maa Sharda Enterprises
      </p>

      <button
        className="contact-btn"
        onClick={() => navigate("/Contact")}
      >
        Contact Us
      </button>

    </section>
  );
}