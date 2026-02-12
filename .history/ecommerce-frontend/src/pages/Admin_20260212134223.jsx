import { useState, useEffect } from "react";

function Admin() {
  const [view, setView] = useState("add");
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
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

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
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
        discount: Number(product.discount),
        stock: Number(product.stock),
      }),
    });

    resetForm();
    fetchProducts();
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        discount: Number(product.discount),
        stock: Number(product.stock),
      }),
    });

    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setProduct(p);
    setPreview(p.image);
    setView("add");
  };

  const resetForm = () => {
    setEditingId(null);
    setProduct({
      name: "",
      price: "",
      discount: "",
      stock: "",
      category: "",
      description: "",
      image: "",
    });
    setPreview(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.navButtons}>
        <button style={styles.navBtn} onClick={() => setView("add")}>
          Add Product
        </button>
        <button style={styles.navBtn} onClick={() => setView("products")}>
          Products
        </button>
      </div>

      {view === "add" && (
        <div style={styles.card}>
          <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>

          <form
            onSubmit={editingId ? updateProduct : addProduct}
            style={styles.form}
          >
            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} style={styles.input} required />
            <input name="price" placeholder="Price" value={product.price} onChange={handleChange} style={styles.input} required />
            <input name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} style={styles.input} />
            <input name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} style={styles.input} />
            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} style={styles.input} />

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

            <p style={{ textAlign: "center" }}>OR Upload Image</p>

            <input type="file" onChange={handleUpload} />

            {preview && (
              <img src={preview} alt="Preview" style={styles.preview} />
            )}

            <button type="submit" style={styles.submitBtn}>
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {view === "products" && (
        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.productCard}>
              {p.image && (
                <img src={p.image} alt={p.name} style={styles.image} />
              )}
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p style={{ fontSize: "12px", color: "#777" }}>
                {p.category}
              </p>

              <div style={styles.actions}>
                <button style={styles.editBtn} onClick={() => startEdit(p)}>
                  Edit
                </button>
                <button style={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },
  navButtons: {
    marginBottom: "25px",
    display: "flex",
    gap: "15px",
  },
  navBtn: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    maxWidth: "650px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "100px",
    fontSize: "14px",
  },
  preview: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  submitBtn: {
    padding: "10px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "30px",
  },
  productCard: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  actions: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  editBtn: {
    background: "#2196f3",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Admin;
