"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/components/Product/types";
import ProductForm from "@/components/ProductForm/ProductForm";
import { updateAction } from "@/utils/updateAction";
import { useParams } from "next/navigation";

const UpdateProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    fetch(`/api/product/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [productId]);

  return (
    <div className="px-4 md:px-12 bg-[$#F8F9FA] pb-8">
      <h2 className="text-center font-semibold pt-8 text-xl md:text-2xl w-full max-w-xl mx-auto">
        Update product
      </h2>
      <ProductForm action={updateAction} initialData={product} />
    </div>
  );
};

export default UpdateProductPage;
