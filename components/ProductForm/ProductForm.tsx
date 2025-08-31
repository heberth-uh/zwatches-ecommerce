"use client";

import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ProductFormProps } from "./types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductForm = ({ action, initialData }: ProductFormProps) => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (initialData?.image) setImageUrl(initialData.image);
  }, [initialData]);

  async function clientAction(formData: FormData) {
    const { error, success, id } = await action(
      formData,
      initialData?._id as string
    );
    if (error) toast.error(error);
    if (success) {
      toast.success(success);
      if (id) {
        router.push(`/product/${id}`);
      } else {
        router.push("/");
      }
      setImageUrl("");
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      if (Math.round(fileSize / 1024) > 1024) {
        toast.error("Image greater than 1MB is not allowed");
      } else {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleCancel = () => {
    if (document.referrer) {
      router.back();
    } else {
      router.push('/')
    }
  }

  return (
    <form
      action={clientAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="alt"
          width={500}
          height={500}
          className="max-w-full max-h-72 object-contain object-center rounded-lg"
        />
      )}
      <div className="flex flex-col w-full gap-2">
        <label>Product image:</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          defaultValue={initialData?.name}
          placeholder="Enter the product name"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          defaultValue={initialData?.price}
          placeholder="00.00"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Seller's Link:</label>
        <input
          type="text"
          name="link"
          defaultValue={initialData?.link}
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Description:</label>
        <textarea
          name="description"
          defaultValue={initialData?.description}
          placeholder="Add a description of the product"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
          rows={4}
        />
      </div>
      <div className="flex items-center gap-8 self-end">
        <button
          type="button"
          className="bg-gray-300 text-black px-10 py-2 rounded-lg cursor-ponter"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-800 text-white px-10 py-2 rounded-lg cursor-ponter"
        >
          {initialData ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
