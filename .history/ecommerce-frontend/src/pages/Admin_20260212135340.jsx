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
    rating: "",
    reviews: "",
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
      stock: "",
      category: "",
      description: "",
      image: "",
      rating: "",
      reviews: "",
    });
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
        rating: Number(product.rating),
        reviews: Number(product.reviews),
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
        rating: Number(product.rating),
        reviews: Number(product.reviews),
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
    setView("add");
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
          <h2>{editingId ? "Edit Product" : "Add Product"}</h2>

          <form
            onSubmit={editingId ? updateProduct : addProduct}
            style={styles.form}
          >
            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} style={styles.input} required />
            <input name="price" placeholder="Price" value={product.price} onChange={handleChange} style={styles.input} required />
            <input name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} style={styles.input} />
            <input name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} style={styles.input} />
            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} style={styles.input} />
            <input name="rating" placeholder="Rating (e.g. 4.5)" value={product.rating} onChange={handleChange} style={styles.input} />
            <input name="reviews" placeholder="Number of Reviews" value={product.reviews} onChange={handleChange} style={styles.input} />

            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            <input
              name="image"
              placeholder="Image URL"
              value={product.image}
              onChange={handleChange}
              style={styles.input}
            />

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
