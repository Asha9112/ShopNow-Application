import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>ShopNow</div>

      {/* Desktop Menu */}
      <div style={styles.desktopMenu}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/categories" style={styles.link}>Categories</Link>
        <Link to="/trending" style={styles.link}>Trending</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
      </div>

      {/* Mobile Hamburger */}
      <div style={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.link} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/categories" style={styles.link} onClick={() => setOpen(false)}>Categories</Link>
          <Link to="/trending" style={styles.link} onClick={() => setOpen(false)}>Trending</Link>
          <Link to="/cart" style={styles.link} onClick={() => setOpen(false)}>Cart</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#111",
    color: "white",
    position: "relative",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },
  desktopMenu: {
    display: "flex",
    gap: "30px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
  },
  hamburger: {
    display: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
  mobileMenu: {
    position: "absolute",
    top: "60px",
    right: "20px",
    backgroundColor: "#222",
    padding: "15px",
    borderRadius: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};

/* Responsive using CSS media query */
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@media (max-width: 768px) {
  .desktopMenu { display: none !important; }
}
`, styleSheet.cssRules.length);

export default Navbar;
