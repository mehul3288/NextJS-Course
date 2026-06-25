"use client"
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/services/products.service";
import { useEffect, useState } from "react";

const AllProducts =  () => {

    // const { products } = useAppContext();
      const [products, setProducts] = useState([]);
    
      useEffect(() => {
        async function getProducts() {
          try {
            const response = await getAllProducts();
            setProducts(response.products);
          } catch (error) {
            console.log(error);
          }
        }
    
        getProducts();
      }, []);
    // const {products}=await getAllProducts();

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
        </>
    );
};

export default AllProducts;
