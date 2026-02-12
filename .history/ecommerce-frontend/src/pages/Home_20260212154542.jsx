import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { cart, addToCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const getCartItem = (id) => {
    return cart.find(item => item.id === id);
  };

  return (
    <div style={styles.container}>
      {products.map((p) => {
        const cartItem = getCartItem(p.id);

        const discount = Number(p.discount) || 0;

        const originalPrice =
          discount > 0
            ? Math.round(p.price / (1 - discount / 100))
            : null;

        return (
          <div key={p.id} style={styles.card}>
            <img src={p.image} alt={p.name} style={styles.image} />

            <h3>{p.name}</h3>

            {/* PRICE SECTION */}
            <div style={styles.priceRow}>
              <span style={styles.offerPrice}>
                ₹{p.price}
              </span>

              {discount > 0 && (
                <>
                  <span style={styles.originalPrice}>
                    ₹{originalPrice}
                  </span>

                  <span style={styles.discountBadge}>
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* CART BUTTON / QTY CONTROL */}
            {!cartItem ? (
              <button
                style={styles.button}
                onClick={() => addToCart(p)}
              >
                Add To Cart
              </button>
            ) : (
              <div style={styles.qtyBox}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => decreaseQty(p.id)}
                >
                  -
                </button>

                <span style={styles.qtyText}>
                  {cartItem.qty}
                </span>

                <button
                  style={styles.qtyBtn}
                  onClick={() => increaseQty(p.id)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px",
    padding: "30px",
    background: "#f4f6f9",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  priceRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "5px",
  },

  offerPrice: {
    fontWeight: "bold",
    fontSize: "18px",
    color: "#1b5e20",
  },

  originalPrice: {
    textDecoration: "line-through",
    color: "gray",
    fontSize: "14px",
  },

  discountBadge: {
    background: "red",
    color: "white",
    padding: "3px 6px",
    borderRadius: "5px",
    fontSize: "12px",
  },

  button: {
    marginTop: "12px",
    padding: "8px 16px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  qtyBox: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  qtyBtn: {
    width: "30px",
    height: "30px",
    background: "black",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },

  qtyText: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default Home;
