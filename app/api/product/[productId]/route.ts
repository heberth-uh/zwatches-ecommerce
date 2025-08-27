import { connectDB } from "@/app/api/db/connectDB";
import Product from "@/app/api/models/product.model";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
    await connectDB();
    const productId = (await params).productId;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return Response.json({message: 'Product not found.'}, {status: 400});
        }

        return Response.json({product}, {status: 200});
    } catch (error: any) {
        return Response.json({message: error.message}, {status: 400})
    }
};
