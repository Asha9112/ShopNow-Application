import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>ShopNow</h2>

      {/* Hamburger Icon */}
      <div style={styles.hamburger} onClick={() => setOpen(!open)}>
        ☰
      </div>

      {/* Menu */}
      {open && (
        <div style={styles.menu}>
          <Link to="/" style={styles.link} onClick={() => setOpen(false)}>Home</Link>
          <Link to="/cart" style={styles.link} onClick={() => setOpen(false)}>Cart</Link>
          <Link to="/login" style={styles.link} onClick={() => setOpen(false)}>Login</Link>
          <Link to="/admin" style={styles.link} onClick={() => setOpen(false)}>Admin</Link>
        </div>
      )}
    </div>
  );
}

const styles = {
  nav: {
    backgroundColor: "#111",
    color: "#fff",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  logo: {
    margin: 0,
  },
  hamburger: {
    fontSize: "24px",
    cursor: "pointer",
  },
  menu: {
    position: "absolute",
    top: "60px",
    right: "10px",
    backgroundColor: "#222",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRadius: "5px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Navbar;
