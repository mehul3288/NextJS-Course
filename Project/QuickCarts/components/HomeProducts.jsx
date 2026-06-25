"use client"
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts } from "@/services/products.service";
import { useRouter } from "next/navigation";

const HomeProducts = () => {

  const router = useRouter();
  const [previewProducts, setPreviewProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await getAllProducts();
        setPreviewProducts(response.products.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {previewProducts.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>
      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
