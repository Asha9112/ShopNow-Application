import { useState, useEffect } from "react";

function Admin() {
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

  const addProduct = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...product,
        price: Number(product.price),
        discount: Number(product.discount),
        rating: Number(product.rating),
        reviews: Number(product.reviews),
      }),
    });

    setProduct({
      name: "",
      price: "",
      discount: "",
      rating: "",
      reviews: "",
      image: "",
    });

    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  return (
    <div style={styles.container}>
      <h2>Add Product</h2>

      <form onSubmit={addProduct} style={styles.form}>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
        <input name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} />
        <input name="rating" placeholder="Rating (4.5)" value={product.rating} onChange={handleChange} />
        <input name="reviews" placeholder="Reviews Count" value={product.reviews} onChange={handleChange} />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>Products</h2>

      {products.map((p) => (
        <div key={p.id} style={styles.product}>
          <img src={p.image} alt={p.name} width="80" />
          <span>{p.name} - ₹{p.price}</span>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
  },
  product: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
};

export default Admin;
