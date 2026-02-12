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

  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setImagePreview(null);
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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  const editProduct = (p) => {
    setEditingId(p.id);
    setProduct(p);
    setImagePreview(p.image);
    setView("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SEARCH + FILTER
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory ? p.category === filterCategory : true)
  );

  // PAGINATION
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div style={styles.page}>

      {/* TOP TOGGLE */}
      <div style={styles.topButtons}>
        <button
          style={view === "add" ? styles.activeBtn : styles.switchBtn}
          onClick={() => setView("add")}
        >
          Add Product
        </button>

        <button
          style={view === "products" ? styles.activeBtn : styles.switchBtn}
          onClick={() => setView("products")}
        >
          All Products
        </button>
      </div>

      {/* ADD PRODUCT */}
      {view === "add" && (
        <div style={styles.card}>
          <h2>Add New Product</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <input name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
            <input name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} />
            <input name="stock" placeholder="Stock Quantity" value={product.stock} onChange={handleChange} />
            <input name="category" placeholder="Category" value={product.category} onChange={handleChange} />
            <textarea name="description" placeholder="Description (Optional)" value={product.description} onChange={handleChange} />
            <input name="image" placeholder="Image URL (Optional)" value={product.image} onChange={handleChange} />

            <p style={{ textAlign: "center" }}>OR Upload Image</p>
            <input type="file" onChange={handleImageChange} />

            {imagePreview && (
              <img src={imagePreview} alt="preview" style={styles.preview} />
            )}

            <button type="submit">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      )}

      {/* PRODUCTS VIEW */}
      {view === "products" && (
        <>
          <div style={styles.filterRow}>
            <input
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {[...new Set(products.map(p => p.category))].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.grid}>
            {currentProducts.map((p) => (
              <div key={p.id} style={styles.productCard}>
                {p.image && (
                  <img src={p.image} alt={p.name} style={styles.image} />
                )}
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>

                <div style={styles.actionRow}>
                  <button style={styles.editBtn} onClick={() => editProduct(p)}>
                    Edit
                  </button>

                  <button style={styles.deleteBtn} onClick={() => deleteProduct(p.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div style={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                style={currentPage === i + 1 ? styles.activePage : styles.pageBtn}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "40px 20px", background: "#f4f6f9", minHeight: "100vh" },
  topButtons: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "25px" },
  switchBtn: { padding: "8px 16px", borderRadius: "6px", border: "1px solid #ccc", background: "white", cursor: "pointer" },
  activeBtn: { padding: "8px 16px", borderRadius: "6px", border: "none", background: "black", color: "white", cursor: "pointer" },
  card: { maxWidth: "650px", margin: "0 auto", background: "white", padding: "30px", borderRadius: "14px", boxShadow: "0 6px 15px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  preview: { width: "120px", marginTop: "10px", borderRadius: "8px" },
  grid: { marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" },
  productCard: { background: "white", padding: "15px", borderRadius: "10px", textAlign: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" },
  image: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px" },
  actionRow: { display: "flex", justifyContent: "space-between", marginTop: "10px" },
  editBtn: { background: "#1976d2", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" },
  deleteBtn: { background: "red", color: "white", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" },
  filterRow: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" },
  pagination: { marginTop: "20px", textAlign: "center" },
  pageBtn: { margin: "0 5px", padding: "6px 10px", cursor: "pointer" },
  activePage: { margin: "0 5px", padding: "6px 10px", background: "black", color: "white", border: "none" },
};

export default Admin;
