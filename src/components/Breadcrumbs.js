import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
const Breadcrumb = () => {
  const { paths } = useContext(CartContext);
  return (
    <nav style={styles.breadcrumb}>
      {paths.map((item, index) => (
        <span key={index} style={styles.crumb}>
          {/* Check if it's the last breadcrumb */}
          {index < paths.length - 1 ? (
            <Link to={item.link} style={styles.link}>
              {item.name}
            </Link>
          ) : (
            <span style={styles.current}>{item.name}</span>
          )}
          {index < paths.length - 1 && (
            <span style={styles.separator}> / </span>
          )}
        </span>
      ))}
    </nav>
  );
};

const styles = {
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    padding: "10px 20px",
    backgroundColor: "#f8f9fa",
  },
  crumb: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  current: {
    color: "#6c757d",
  },
  separator: {
    margin: "0 5px",
    color: "#6c757d",
  },
};

export default Breadcrumb;
