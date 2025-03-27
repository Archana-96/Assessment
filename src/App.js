import Breadcrumbs from "./components/Breadcrumbs.js";
import Productlist from "./components/Productlist.js";
import Cart from "./components/Cart.js";
import Productdetails from "./components/Productdetails.js";
import OrderSummery from "./components/OrderSummery.js";
import About from "./components/About.js";
import Contact from "./components/Contact.js";
import Profile from "./components/Profile.js";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";
import logo from "./assets/images/logo.jpg";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./contexts/CartContext";

import Checkout from "./components/Checkout.js";

function App() {
  const { handlemenueselect } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  console.log("Cart value in JS" + cartCount);
  const navigate = useNavigate();

  const handleCartClick = (id) => {
    handlemenueselect("Cart", "/Cart");
    navigate("/Cart");
  };

  const handlemenueRedirection = (name, link) => {
    if (name === "About") {
      handlemenueselect(name, link);
      navigate("/About");
    } else if (name === "Contact") {
      handlemenueselect(name, link);
      navigate("/Contact");
    } else if (name === "Profile") {
      handlemenueselect(name, link);
      navigate("/Profile");
    }
  };
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      localStorage.setItem("initialArray", JSON.stringify(response.data));
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    console.log("in");
    setSearchTerm(term);
    if (term === "") {
      setProducts(JSON.parse(localStorage.getItem("initialArray")));
    } else {
      let temProduct = JSON.parse(localStorage.getItem("initialArray"));
      const filteredProducts = temProduct.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filteredProducts);
      console.log(filteredProducts);
    }
  };

  const handleHomeClick = (id) => {
    navigate(`/Productlist`);
  };
  return (
    <div className="App">
      <header style={styles.header}>
        <div style={styles.logo}>
          <img src={logo} alt="Logo" style={styles.logoImg} />
          <h1 style={styles.logoText}>YourChoice</h1>
        </div>
        <nav style={styles.menu}>
          <ul style={styles.menuList}>
            <li style={styles.menuItem} onClick={handleHomeClick}>
              Home
            </li>

            <li
              style={styles.menuItem}
              onClick={() => handlemenueRedirection("About", "/about")}
            >
              About
            </li>
            <li
              style={styles.menuItem}
              onClick={() => handlemenueRedirection("Contact", "/Contact")}
            >
              Contact
            </li>
          </ul>
        </nav>
        <div style={styles.actions}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            style={styles.searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaUserCircle
            style={styles.icon}
            onClick={() => handlemenueRedirection("Profile", "/Profile")}
          />
          <FaShoppingCart
            style={styles.icon}
            onClick={() => handleCartClick("Cart", "/Cart")}
          />
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "013px",
                right: "0",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </header>
      <div>
        <Breadcrumbs />
      </div>

      <main className="App-main">
        <Routes>
          <Route
            path="/"
            element={
              <Productlist products={products} onSearch={handleSearch} />
            }
          />
          <Route
            path="/Productlist"
            element={
              <Productlist products={products} onSearch={handleSearch} />
            }
          />
          <Route
            path="/productdetails/:id"
            element={<Productdetails products={products} />}
          />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/OrderSummery" element={<OrderSummery />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </main>

      <footer style={styles.header}>
        <h6>Conditions of Use & Sale Privacy Notice Cookies Notice</h6>
      </footer>
    </div>
  );
}
const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #ddd",
  },
  logo: { display: "flex", alignItems: "center" },
  logoImg: { width: "50px", height: "50px", marginRight: "10px" },
  logoText: { fontSize: "24px", fontWeight: "bold", color: "#333" },
  menu: {},
  menuList: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  menuItem: {
    margin: "0 15px",
    cursor: "pointer",
    color: "#333",
    fontSize: "16px",
  },
  actions: { display: "flex", alignItems: "center", gap: "20px" },
  searchInput: {
    padding: "5px 10px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  icon: { fontSize: "20px", cursor: "pointer", color: "#333" },
};
export default App;
