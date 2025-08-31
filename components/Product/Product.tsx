"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { type Product } from "../Products/types";
import toast from "react-hot-toast";


const Product = () => {
  const [product, setProduct] = useState<Product>();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/product/${params.productId}`)
      .then((response) => setProduct(response.data.product));
  }, []);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/product/${params.productId}`);
      toast.success('Product deleted successfully');
      router.push('/');
    } catch (error : any) {
      toast.error('Failed to delete product');
    }
  }

  return (
    <section className="px-4 py-10 md:px-12 bg-[#f8f9fa]">
      <p className="cursor-pointer px-3" onClick={() => router.back()}>
        &larr; Back
      </p>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:space-x-10">
        <Image
          src={product.image}
          alt="Product image"
          width={1000}
          height={1000}
          className="max-w-full md:max-w-xl md:min-w-[30rem] min-h-[28rem] max-h-[28rem] object-contain object-center basis-1/2"
        />
        <div className="basis-1/2 self-start py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">{product.name}</h2>

            <div className="text-2xl font-bold -mt-2 relative">
              <span
                onClick={() => setOpen(!open)}
                className="cursor-pointer tracking-widest"
              >
                ...
              </span>
              {open && (
                <div className="absolute bg-white shadow-md text-base rounded-md font-normal right-0 top-10">
                  <Link href={`/product/${product._id}/update`}>
                    <p className="px-5 py-2 border-b border-gray-300">Update</p>
                  </Link>
                  <p className="px-5 py-2 border-b border-gray-300 text-red-500 cursor-pointer"
                  onClick={handleDelete}>
                    Delete
                  </p>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-3xl font-semibold mt-3">${product.price}</h3>

          <Link href={product.link} target="_blank">
            <button className="mt-8 bg-black hover:bg-gray-900 text-white px-3 py-2 w-full font-semibold rounded-md cursor-pointer">
              Contact Seller
            </button>
          </Link>

          <p className="font-semibold mt-10 text-lg">Description</p>
          <p className="mt-1 text-base">{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default Product;
