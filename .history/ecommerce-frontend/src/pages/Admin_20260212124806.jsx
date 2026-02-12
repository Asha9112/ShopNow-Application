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
    <div style={{ padding: "20px" }}>
      <h2>Admin – Manage Products</h2>

      <form onSubmit={addProduct} style={{ marginBottom: "20px" }}>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <h3>Product List</h3>

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: "10px" }}>
          <strong>{p.name}</strong> – ₹{p.price}
          <button
            style={{ marginLeft: "10px", background: "red", color: "white" }}
            onClick={() => deleteProduct(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
