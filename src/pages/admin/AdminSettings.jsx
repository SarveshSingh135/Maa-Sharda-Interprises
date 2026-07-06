import { useState } from "react";

export default function AdminSettings() {

  const settings =
    JSON.parse(localStorage.getItem("settings")) || {

      websiteName: "Maa Sharda Enterprises",
      phone: "9005622817",
      email: "admin@gmail.com",
      address: "Prayagraj, Uttar Pradesh",
      whatsapp: "919005622817",
      website: "https://maasharda.com",
      facebook: "",
      instagram: "",
      youtube: "",
      open: "09:00 AM",
      close: "08:00 PM",

    };

  const [form, setForm] = useState(settings);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(form)
    );

    alert("Website Settings Saved Successfully");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#07173A",
        display: "flex",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "700px",
          background: "#10245d",
          padding: "35px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          ⚙ Website Settings
        </h1>

        <Input
          name="websiteName"
          value={form.websiteName}
          onChange={handleChange}
          placeholder="Website Name"
        />

        <Input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <Input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />

        <Input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <Input
          name="whatsapp"
          value={form.whatsapp}
          onChange={handleChange}
          placeholder="WhatsApp Number"
        />

        <Input
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website URL"
        />

        <Input
          name="facebook"
          value={form.facebook}
          onChange={handleChange}
          placeholder="Facebook Link"
        />

        <Input
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          placeholder="Instagram Link"
        />

        <Input
          name="youtube"
          value={form.youtube}
          onChange={handleChange}
          placeholder="YouTube Link"
        />

        <Input
          name="open"
          value={form.open}
          onChange={handleChange}
          placeholder="Opening Time"
        />

        <Input
          name="close"
          value={form.close}
          onChange={handleChange}
          placeholder="Closing Time"
        />

        <button
          onClick={saveSettings}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          💾 Save Settings
        </button>

      </div>
    </div>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        width: "100%",
        padding: "15px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "2px solid #d4af37",
        background: "#1d1d1d",
        color: "#fff",
        fontSize: "16px",
        boxSizing: "border-box",
      }}
    />
  );
}