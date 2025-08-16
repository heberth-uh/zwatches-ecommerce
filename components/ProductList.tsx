import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductList = () => {
  const products = ["", "", ""];
  return (
    <div id="product" className="px-4 md:px-12 py-5 md:py-10 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Link href={"/product/123"} key={index}>
            <Image
              src="/dummy-img.jpg"
              alt={product}
              width={1000}
              height={1000}
              className="max-w-[17rem] h-72 object-cover object-center rounded-lg"
            />

            <div className="mt-4">
                <h2 className="font-semibold text-lg">A very good watch</h2>
                <p className="font-medium mt-1">$2,300</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
