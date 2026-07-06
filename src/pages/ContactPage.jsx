import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function ContactPage() {
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    phone: "9118239297",
    address:
      "Thakur Niwash, Pratap Bhattha ke Samne, Bahua Tiraha, Fatehpur Road, Uttar Pradesh",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(
      localStorage.getItem("contactData")
    );

    if (savedData) {
      setContactData(savedData);
    }
  }, []);
  const handleSubmit = () => {
  if (!name || !phone || !message) {
    alert("Please fill all fields");
    return;
  }

  const newMessage = {
    name,
    phone,
    message,
    date: new Date().toLocaleString(),
  };

  const oldMessages =
    JSON.parse(localStorage.getItem("contactMessages")) || [];

  oldMessages.push(newMessage);

  localStorage.setItem(
    "contactMessages",
    JSON.stringify(oldMessages)
  );

  alert("Message Sent Successfully");

  setName("");
  setPhone("");
  setMessage("");
};

  return (
    <div className="contact-page">

      <h1>📞 Contact Us</h1>

      <div className="contact-container">

        <div className="contact-info">

          <h2>Maa Sharda Enterprises</h2>

          <p>
            📍 {contactData.address}
          </p>

          <p>
            📞
            <a href={`tel:+91${contactData.phone}`}>
              +91 {contactData.phone}
            </a>
          </p>

          <p>
            📧
            <a href="mailto:shivamsingh749254@gmail.com">
              shivamsingh749254@gmail.com
            </a>
          </p>

          <p>
            🕒 Mon - Sun : 9:00 AM - 9:00 PM
          </p>

          <a
            href={`https://wa.me/91${contactData.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp"
          >
            💬 Chat on WhatsApp
          </a>

          <a
            href={`tel:+91${contactData.phone}`}
            className="call-btn"
          >
            📞 Call Now
          </a>

          <div className="map-box">
            <iframe
              title="Maa Sharda Enterprises"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3590.7544730652758!2d80.62616229057309!3d25.8446346437392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c9149f42f5cf9%3A0x2ecc77a473f4391d!2sThakur%20niwas!5e0!3m2!1sen!2sin!4v1781878953832!5m2!1sen!2sin"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="trust-box">
            <div>✅ Genuine Products</div>
            <div>🚚 Fast Delivery</div>
            <div>⭐ Best Quality</div>
            <div>💯 Customer Satisfaction</div>
          </div>

        </div>

        <div className="contact-form">

          <h2>Send Message</h2>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            rows="6"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button className="send-btn"
              onClick={handleSubmit}
          >
            Send Message
          </button>

          <p className="response-text">
            We usually respond within 30 minutes.
          </p>

        </div>

      </div>

      <footer className="footer">
        <h3>Maa Sharda Enterprises</h3>

        <p>
          Furniture • Electronics • Appliances • Electrical
        </p>

        <p>© 2026 All Rights Reserved</p>
      </footer>

    </div>
  );
}