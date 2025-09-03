"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";

const Products = ({title = 'All Products'} : {title?: string}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/fetch-products")
      .then((response) => setProducts(response.data.products));
  }, []);

  return (
    <div>
      <h2 className="w-full text-center text-xl md:text-4xl font-semibold py-6">
        {title}
      </h2>
      <ProductGrid products={products}/>
    </div>
  );
};

export default Products;
