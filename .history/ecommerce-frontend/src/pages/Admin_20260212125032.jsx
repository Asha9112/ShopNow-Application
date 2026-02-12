import { useState, useEffect } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: Number(product.price),
        image: product.image,
      }),
    });

    setProduct({ name: "", price: "", image: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Add Product</h2>

        <form onSubmit={addProduct} style={styles.form}>
          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.addBtn}>
            Add Product
          </button>
        </form>
      </div>

      <h2 style={{ marginTop: "40px" }}>Product List</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.productCard}>
            <img src={p.image} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "8px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "8px",
    background: "#111",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  productCard: {
    background: "white",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  deleteBtn: {
    marginTop: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default Admin;
