import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function deleteImageFromUrl(imgUrl: string) {
  const parts = imgUrl.split("/");
  const filename = parts[parts.length - 1];
  const imageId = filename.split(".")[0];
  cloudinary.uploader
    .destroy(`nextjs-ecommerc/${imageId}`) // Folder + imageId
    .then((result) => console.log("Result", result));
}

export async function uploadImage(image: File) {
  const arrayBuffer = await image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "nextjs-ecommerce",
        },
        async (error, result) => {
          if (error) {
            return reject(error.message);
          }
          return resolve(result);
        }
      )
      .end(buffer);
  });
}

export default cloudinary;
