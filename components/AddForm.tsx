"use client";

import { addAction } from "@/utils/addAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const AddForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function clientAddAction(formData: FormData) {
    const { error, success } = await addAction(formData);
    if (error) toast.error(error);
    if (success) {
      toast.success(success);
      router.push("/");
      setImageUrl('');
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

  return (
    <form
      action={clientAddAction}
      className="w-full max-w-xl mx-auto flex flex-col justify-center items-center space-y-4 mt-3 md:mt-5"
    >
      {imageUrl && <Image src={imageUrl} alt="alt" width={500} height={500} className="max-w-full max-h-72 object-cover object-center rounded-lg"/>}
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
          placeholder="Enter the product name"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Price:</label>
        <input
          type="number"
          name="price"
          placeholder="00.00"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Seller's Link:</label>
        <input
          type="text"
          name="link"
          placeholder="Link to where buyers can find you"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
        />
      </div>
      <div className="flex flex-col w-full gap-2">
        <label>Description:</label>
        <textarea
          name="description"
          placeholder="Add a description of the product"
          className="w-full px-3 py-2 text-gray-600 rounded-lg border border-gray-300"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-gray-800 text-white px-10 py-2 rounded-lg self-end"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddForm;
