"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductGrid from "../Products/ProductGrid";

function SearchResults() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchParams) {
      axios
        .get(`/api/search?searchTerm=${searchTerm}`)
        .then((response) => setProducts(response.data.products))
        .catch((error) =>
          console.log("Error fetching search results: ", error)
        );
    }
  }, [searchParams]);

  return (
    <section>
      <p className="text-center">results found for "{searchTerm}"</p>
      <ProductGrid products={products} />
    </section>
  );
}

export default SearchResults;
