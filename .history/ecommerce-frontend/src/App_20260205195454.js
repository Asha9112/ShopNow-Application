import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CartProvider from "./context/CartContext";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import AuthProvider from "./context/AuthContext";


function App() {
  return (
     <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
