import React from "react";
import { Link } from "react-router-dom";

const PackageItem = ({ item }) => {
  return (
    <Link to={`/packages/${item.packageId}`}>
      <div className="package-card">
        <div>{item.packageName}</div>
        <div>{item.description}</div>
        <div>Price: {item.price} SEK</div>
      </div>
    </Link>
  );
};
export default PackageItem;
