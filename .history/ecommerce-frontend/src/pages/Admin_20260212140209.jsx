import { useState, useEffect } from "react";

function Admin() {
  const [editingId, setEditingId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    rating: "",
    reviews: "",
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

  const resetForm = () => {
    setEditingId(null);
    setProduct({
      name: "",
      price: "",
      discount: "",
      rating: "",
      reviews: "",
      image: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedProduct = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      rating: Number(product.rating),
      reviews: Number(product.reviews),
    };

    if (editingId) {
      // UPDATE
      await fetch(`http://localhost:5000/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedProduct),
      });
    } else {
      // ADD
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
        <h2 style={styles.heading}>
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
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
            name="rating"
            placeholder="Rating (e.g. 4.5)"
            value={product.rating}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="reviews"
            placeholder="Reviews Count"
            value={product.reviews}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="image"
            placeholder="Image URL"
            value={product.image}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.submitBtn}>
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

      <h2 style={styles.productsHeading}>All Products</h2>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p.id} style={styles.productCard}>
            <img src={p.image} alt={p.name} style={styles.image} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <div style={styles.buttonGroup}>
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
    maxWidth: "550px",
    margin: "0 auto",
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },

  heading: {
    marginBottom: "20px",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  submitBtn: {
    background: "black",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  cancelBtn: {
    background: "#999",
    color: "white",
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },

  productsHeading: {
    marginTop: "50px",
    textAlign: "center",
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

  buttonGroup: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
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
