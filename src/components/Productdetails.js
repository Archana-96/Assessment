import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaSearchPlus } from "react-icons/fa";
import { CartContext } from "../contexts/CartContext";
const Productdetails = ({ products }) => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [details, setdetails] = useState({});
  const [isZoomed, setIsZoomed] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#FFD700" : "#ccc" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      console.log(response.data);
      setdetails(response.data);
    };

    fetchDetails();
  }, []);

  return (
    <div className="row">
      <div className="col-md-6 mb-6 ">
        <div className={styles.boderclass}>
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          />
          {isZoomed && (
            <div className="zoom-overlay">
              <FaSearchPlus style={{ fontSize: "30px", color: "#fff" }} />
            </div>
          )}
        </div>
        <div
          className="thumbnail-container"
          style={{
            display: "flex",
            marginTop: "10px",
            gap: "10px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <img
            src={details.image}
            alt={details.title}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="col-md-6 mb-6">
        <h5>{details.title}</h5>
        <p>{details.description}</p>
        <div>
          <div>{renderStars(Math.round(details.rating) || 0)}</div>
          <div style={{ marginLeft: "10px" }}>
            <a href="#reviews" style={{ marginRight: "15px" }}>
              Reviews
            </a>
            <a href="#qa">Q&A</a>
          </div>
        </div>
        <p>${details.price}</p>
        <p className={styles.leftalign}>Available to Ship</p>
        <p>Check in-store Availablility</p>
        <p>See same day delivery eligibility in bag</p>
        <button className="btn btn-primary" onClick={() => addToCart(details)}>
          Add to Bag
        </button>
      </div>
    </div>
  );
};

const styles = {
  boderclass: {
    border: "1px solid gray",
    borderRadius: "5px",
    overflow: "hidden",
    position: "relative",
  },
  leftalign: {
    textalign: "left",
  },
};

export default Productdetails;
