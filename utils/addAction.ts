"use server";

import { connectDB } from "@/app/api/db/connectDB";
import { uploadImage } from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function addAction(formData: FormData, _?: string) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!image || !name || !price || !link || !description) {
      console.log("All fileds are required");
      return { error: "All fields are required" };
    }

    await connectDB();

    // Image processes
    const imageResponse: any = await uploadImage(image);

    // Store in Data base
    const product = await Product.create({
      image: imageResponse.secure_url,
      name,
      price,
      link,
      description,
    });
    return {
      success: "Product added successfully",
      id: product._id.toString(),
    };
  } catch (error: any) {
    return { error: `Something went wrong: ${error.message}` };
  }
}
