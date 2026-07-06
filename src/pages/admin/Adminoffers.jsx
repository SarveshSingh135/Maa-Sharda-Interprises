import { useState } from "react";

export default function Adminoffers() {

  const [offer,setOffer] = useState("");

  const saveOffer = () => {

    const oldOffers =
      JSON.parse(localStorage.getItem("offers")) || [];

    oldOffers.push(offer);

    localStorage.setItem(
      "offers",
      JSON.stringify(oldOffers)
    );

    alert("Offer Saved");
    setOffer("");
  };

  return (
    <div className="admin-page">

      <h1>Admin Offers</h1>

      <input
        type="text"
        placeholder="Offer Name"
        value={offer}
        onChange={(e)=>setOffer(e.target.value)}
      />

      <button onClick={saveOffer}>
        Save Offer
      </button>

    </div>
  );
}