import React from "react";
import ProductForm from "@/components/ProductForm/ProductForm";
import { addAction } from "@/utils/addAction";

const AddProductPage = () => {
  return (
    <div className="px-4 md:px-12 bg-[$#F8F9FA] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full mx-auto max-w-xl">
        Add a new product
      </h2>
      <ProductForm action={addAction} />
    </div>
  );
};

export default AddProductPage;
