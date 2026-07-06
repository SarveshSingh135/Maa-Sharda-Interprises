import { useNavigate } from "react-router-dom";
import { addToCart } from "../../utils/cart";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";


export default function ElectronicsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const products =
    JSON.parse(
      localStorage.getItem("electronicsProducts")
    ) || [];

  return (
    <div className="page">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>

      <h1>Electronics</h1>
      <SearchBar 
         search={search}
         setSearch={setSearch}
      />

      {products.length === 0 ? (
        <>
          <h3>LED TV</h3>
          <h3>Smart TV</h3>
          <h3>Sound System</h3>
          <h3>Home Theatre</h3>
          <h3>Bluetooth Speaker</h3>
        </>
      ) : (
        <div className="products-grid">
          {products
            .filter((item) =>
              item.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div key={index} className="product-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="product-img"
                />

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <h3>{item.brand}</h3>

                <p>Stock : {item.stock}</p>

                <h3>
                  ₹{item.offerPrice}
                  <del
                    style={{
                      marginLeft: "10px",
                      color: "gray",
                    }}
                  >
                    ₹{item.originalPrice}
                  </del>
                </h3>

                <div className="product-buttons">
                  <button
                    className="buy-btn"
                    onClick={() => {
                      const cart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      cart.push(item);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );

                      navigate("/cart");
                    }}
                  >
                    Buy Now
                  </button>

                  <button
                    className="cart-btn"
                    onClick={() => {
                      const cart =
                        JSON.parse(localStorage.getItem("cart")) || [];

                      cart.push(item);

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );

                      alert("Added To Cart");
                    }}
                  >
                    🛒 Add To Cart
                  </button>
                </div>

               
              </div>
            ))}
        </div>
      )}
    </div>
  );
}