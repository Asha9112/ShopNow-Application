import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={styles.container}>
      {products.map((p) => {
        const discount = p.discount || 0;
        const originalPrice =
          discount > 0
            ? Math.round(p.price / (1 - discount / 100))
            : null;

        return (
          <div key={p.id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={p.image} alt={p.name} style={styles.image} />

              {discount > 0 && (
                <div style={styles.discountBadge}>
                  {discount}% OFF
                </div>
              )}

              <button
                style={styles.addBtn}
                onClick={() => addToCart(p)}
              >
                ADD
              </button>
            </div>

            <div style={styles.details}>
              <div style={styles.priceRow}>
                <span style={styles.offerPrice}>
                  ₹{p.price}
                </span>

                {discount > 0 && (
                  <span style={styles.originalPrice}>
                    ₹{originalPrice}
                  </span>
                )}
              </div>

              <p style={styles.name}>{p.name}</p>

              {p.category && (
                <p style={styles.category}>{p.category}</p>
              )}

              {p.rating > 0 && (
                <div style={styles.rating}>
                  ⭐ {p.rating} ({p.reviews || 0})
                </div>
              )}

              {p.stock !== undefined && (
                <p style={styles.stock}>
                  {p.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
