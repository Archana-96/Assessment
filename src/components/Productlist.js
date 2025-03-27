import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
const Productlist = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { handlemenueselect } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    handlemenueselect("Details", "/Productdetails");
    navigate(`/Productdetails/${id}`);
  };

  return (
    <div>
      <h4 style={styles.leftAlign}>Deals for You</h4>
      <div className="row">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-md-3 mb-4"
            style={{ marginBottom: "45px" }}
          >
            {" "}
            <div
              className="card"
              style={styles.productCard}
              onClick={() => handleCardClick(product.id)}
            >
              <div
                className="d-flex justify-content-center"
                style={styles.imageContainer}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-img-top"
                  style={styles.productImage}
                />
              </div>
            </div>
            <div style={styles.cardbody}>
              <p className="card-title" title={product.title}>
                <b>{product.title}</b>
              </p>
              <p className="card-text" title={product.description}>
                {product.description.slice(0, 70) + "..."}
              </p>

              <p className="card-text">Price: ${product.price}</p>
            </div>
            <div style={styles.addToBagButton}>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
                <FaShoppingCart style={{ marginRight: "8px" }} />
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = {
  leftAlign: {
    display: "flex",
    alignItems: "left",
    padding: "5px",
  },
  image: {
    width: "95%",
    padding: "5px",
  },
  container: {
    padding: "20px",
  },
  productGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  productCard: {
    width: "220px",
    margin: "0 auto",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    overflow: "hidden",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: "30px",
  },
  imageContainer: {
    height: "150px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  cardbody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "4px",
  },
  addToBagButton: {
    marginTop: "10px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
export default Productlist;
