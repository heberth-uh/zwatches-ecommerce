"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchTerm = searchParams.get("searchTerm");
    if (searchParams) {
      axios
        .get(`/api/search?searchTerm=${searchTerm}`)
        .then((response) => console.log(response.data));
    }
  }, [searchParams]);
  
  return <div>SearchPage</div>;
};

export default SearchPage;
