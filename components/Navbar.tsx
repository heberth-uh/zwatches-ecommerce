import Link from "next/link";
import React from "react";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="px-4 md:px-12 py-4 md:py-6 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link href={'/'} className="hidden md:inline-block text-lg font-semibold">Zwatches</Link>
        <div className="relative max-w-[300px] md:w-[400px]">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-none:">
                <Search className="size-4"/>
            </div>
            <input type="text" placeholder="Search" className="h-[36px] relative pl-10 border-[1px] border-black/70 text-sm rounded-[8px] w-full py-2 px-3 focus:outline-none bg-transparent"/>
        </div>
        <Link href={'/add-product'} className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md cursor-pointer">Add Product</Link>
      </div>
    </nav>
  );
};

export default Navbar;
