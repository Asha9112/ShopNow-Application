import { useState } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();
    alert("Product added successfully");

    setProduct({ name: "", price: "", image: "" });
  };

  return (
    <div style={styles.container}>
      <h2>Admin – Add Product</h2>

      <form onSubmit={addProduct} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          name="image"
          placeholder="Image URL"
          value={product.image}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

export default Admin;
