import { useState, useEffect } from "react";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
    discount: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setProduct({ ...product, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
        discount: Number(product.discount),
      }),
    });

    alert("Product Added");
    setProduct({
      name: "",
      price: "",
      image: "",
      description: "",
      category: "",
      stock: "",
      discount: "",
    });
    setPreviewImage(null);
    fetchProducts();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Add New Product</h2>

        <form onSubmit={addProduct} style={styles.form}>
          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            name="discount"
            placeholder="Discount %"
            value={product.discount}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Product Description (Optional)"
            value={product.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <input
            name="image"
            placeholder="Image URL (Optional)"
            value={product.image}
            onChange={handleChange}
            style={styles.input}
          />

          <p style={{ textAlign: "center", margin: "5px 0" }}>
            OR Upload Image
          </p>

          <input type="file" onChange={handleImageUpload} />

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={styles.preview}
            />
          )}

          <button type="submit" style={styles.addBtn}>
            Add Product
          </button>
        </form>
      </div>

      <h2 style={{ marginTop: "40px" }}>All Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.productCard}>
            <img src={p.image} alt={p.name} style={styles.image} />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p style={{ fontSize: "12px", color: "#666" }}>
              {p.description}
            </p>
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
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    maxWidth: "500px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  addBtn: {
    padding: "10px",
    background: "#111",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },
  preview: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginTop: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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
};

export default Admin;
