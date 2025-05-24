import React, { useEffect, useState } from "react";
import PackageItem from "./PackageItem";

const PackageList = () => {
  const [packages, setPackages] = useState([]);

  const getPackages = async () => {
    const res = await fetch(
      "https://packageserviceventixe-gxd7f5h6dde3dxam.swedencentral-01.azurewebsites.net/api/packages"
    );

    if (res.ok) {
      const response = await res.json();
      setPackages(response.result);
    }
  };

  useEffect(() => {
    getPackages();
  }, []);

  return (
    <section id="packages">
      <h2>Packages</h2>
      {packages.map((pkg) => (
        <PackageItem key={pkg.packageId} item={pkg} />
      ))}
    </section>
  );
};

export default PackageList;
