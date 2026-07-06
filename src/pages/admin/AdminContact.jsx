import { useState } from "react";

export default function AdminContact() {

  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");

  const saveContact = () => {

    localStorage.setItem(
      "contactData",
      JSON.stringify({
        phone,
        address,
      })
    );

    alert("Saved");
  };

  return (
    <div className="admin-page">

      <h1>Admin Contact</h1>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e)=>setAddress(e.target.value)}
      />

      <button onClick={saveContact}>
        Save Contact
      </button>

    </div>
  );
}