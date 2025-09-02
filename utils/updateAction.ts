"use server";

import { connectDB } from "@/app/api/db/connectDB";
import { deleteImageFromUrl, uploadImage } from "./cloudinary";
import Product from "@/app/api/models/product.model";

export async function updateAction(formData: FormData, id: string) {
  try {
    const image = formData.get("image") as File;
    const name = formData.get("name");
    const price = formData.get("price");
    const link = formData.get("link");
    const description = formData.get("description");

    if (!name || !price || !link || !description) {
      console.log("All fileds are required");
      return { error: "All fields are required" };
    }

    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return {
        error: "No product found",
      };
    }

    if (image.size === 0) {
      // update without the image
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        name,
        price,
        link,
        description,
      });
      return {
        success: "Product updated successfully",
        id: updatedProduct._id.toString(),
      };
    } else {
      // Delete the previous img first
      await deleteImageFromUrl(product.image);

      // Image processes
      const imageResponse: any = await uploadImage(image);

      // Store newin Data base
      const updatedProduct = await Product.findByIdAndUpdate(id, {
        image: imageResponse.secure_url,
        name,
        price,
        link,
        description,
      });
      return {
        success: "Product updated successfully",
        id: updatedProduct._id.toString(),
      };
    }
  } catch (error: any) {
    return { error: `Something went wrong: ${error.message}` };
  }
}
