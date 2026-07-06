import { useState } from "react";

export default function AdminElectronics() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState(
  JSON.parse(
    localStorage.getItem("electronicsProducts")
  ) || []
);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const product = {
      name,
      description,
      brand,
      stock,
      image,
      originalPrice,
      offerPrice,
    };

    const oldProducts =
      JSON.parse(
        localStorage.getItem("electronicsProducts")
      ) || [];

    oldProducts.push(product);
    setProducts(oldProducts);

    localStorage.setItem(
      "electronicsProducts",
      JSON.stringify(oldProducts)
    );

    alert("Electronics Product Saved Successfully!");

    setName("");
    setDescription("");
    setBrand("");
    setStock("");
    setImage("");
    setOriginalPrice("");
    setOfferPrice("");
  };

  return (
    <div className="admin-page">
      <h1>📺 Electronics Management</h1>

      <input
        type="file"
        onChange={handleImage}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Brand Name"
        value={brand}
        onChange={(e) =>
          setBrand(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) =>
          setStock(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Original Price"
        value={originalPrice}
        onChange={(e) =>
          setOriginalPrice(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Offer Price"
        value={offerPrice}
        onChange={(e) =>
          setOfferPrice(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleSave}>
        Save Product
      </button>
      <hr style={{ margin: "30px 0" }} />

<h2>Saved Products</h2>

{products.length === 0 ? (
  <p>No Products Added</p>
) : (
  products.map((item, index) => (
    <div
      key={index}
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginTop: "15px",
        borderRadius: "10px",
        background: "#fff",
        color: "#000",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        width="120"
        height="120"
        style={{ objectFit: "cover" }}
      />

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <p>Stock: {item.stock}</p>

      <p>Price: ₹{item.price}</p>

      <p>Offer Price: ₹{item.originalPrice}</p>

      <button
        onClick={() => {
          const updatedProducts = products.filter(
            (_, i) => i !== index
          );

          setProducts(updatedProducts);

          localStorage.setItem(
            "electronicsProducts",
            JSON.stringify(updatedProducts)
          );
        }}
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