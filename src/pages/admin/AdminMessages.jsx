import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    setMessages(savedMessages);
  }, []);

  const handleDelete = (index) => {
    const updatedMessages = messages.filter(
      (_, i) => i !== index
    );

    setMessages(updatedMessages);

    localStorage.setItem(
      "contactMessages",
      JSON.stringify(updatedMessages)
    );
  };

  return (
    <div className="admin-page">
      <h1>📩 Customer Messages</h1>

      {messages.length === 0 ? (
        <p
          style={{
            color: "#fff",
            marginTop: "30px",
          }}
        >
          No Messages Found
        </p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              color: "#000",
              padding: "20px",
              marginTop: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,.2)",
            }}
          >
            <h3>{msg.name}</h3>

            <p>
              <strong>Email:</strong> {msg.email}
            </p>

            <p>
              <strong>Phone:</strong> {msg.phone}
            </p>

            <p>
              <strong>Message:</strong> {msg.message}
            </p>

            <button
              onClick={() => handleDelete(index)}
              style={{
                background: "red",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}