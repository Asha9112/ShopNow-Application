import { useState, useEffect } from "react";

function Admin() {
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

  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProduct = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      stock: Number(product.stock),
    };

    if (editingId) {
      await fetch(`http://localhost:5000/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct),
      });
    } else {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct),
      });
    }

    resetForm();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setProduct(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
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
            name="discount"
            placeholder="Discount %"
            value={product.discount}
            onChange={handleChange}
          />

          <input
            name="stock"
            placeholder="Stock Quantity"
            value={product.stock}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product Description (Optional)"
            value={product.description}
            onChange={handleChange}
          />

          <input
            name="image"
            placeholder="Image URL (Optional)"
            value={product.image}
            onChange={handleChange}
          />

          <p style={{ textAlign: "center" }}>OR Upload Image</p>
          <input type="file" disabled />

          <button type="submit">
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={styles.cancelBtn}
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <h2 style={{ marginTop: "40px", textAlign: "center" }}>
        All Products
      </h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.productCard}>
            {p.image && (
              <img src={p.image} alt={p.name} style={styles.image} />
            )}
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <div style={styles.actionRow}>
              <button
                style={styles.editBtn}
                onClick={() => editProduct(p)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteProduct(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px 20px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  card: {
    maxWidth: "650px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  cancelBtn: {
    marginTop: "8px",
    background: "#999",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  grid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },

  productCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },

  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  },

  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  editBtn: {
    background: "#1976d2",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Admin;
