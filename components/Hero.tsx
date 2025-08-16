import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-[70vh] md:min-h-[60vh] lg:min-h-[90vh] flex flex-col md:flex-row gap-y-10 justify-center items-center bg-white px-4 md:px-12 text-black">
      <div className="max-w-2xl">
        <h1 className="text-5xl pt-6 md:pt-0 md:text-7xl leading-tight">
          Timeless Elegance on your Wrist
        </h1>
        <p className="text-gray-500">
          discover our curated collection of premium watches, crafted for those
          who appreciate sophistication and precision.
        </p>
        <Link href={"#product"}>
          <button className="mt-8 bg-gray-800 text-white px-3 py-2 rounded-md">
            Shop the Collection
          </button>
        </Link>
      </div>
      <div>
        <Image src='/hero/hero-img.png' width={500} height={500} alt="Hero image"/>
      </div>
    </div>
  );
};

export default Hero;
