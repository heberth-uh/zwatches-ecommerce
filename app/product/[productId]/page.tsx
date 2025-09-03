import Product from "@/components/Product/Product";
import Products from "@/components/Products/Products";
import React from "react";

const ProductPage = () => {
  return (
    <>
      <Product />
      <Products title="Related Products"/>
    </>
  );
};

export default ProductPage;
