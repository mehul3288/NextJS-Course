'use client'
import React, { useState, useActionState, useEffect, startTransition } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { addProductAction } from "@/actions/product.actions";
import toast from "react-hot-toast";

const AddProduct = () => {

  const [files, setFiles] = useState([]);
  const [state, formAction, isPending] = useActionState(addProductAction, null);

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Product added successfully!");
        setFiles([]);
        const form = document.getElementById("add-product-form");
        if (form) form.reset();
      } else if (state.error) {
        toast.error(state.error);
      }
    }
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Basic validation
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerPrice");

    if (!name || !name.toString().trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (!description || !description.toString().trim()) {
      toast.error("Product description is required.");
      return;
    }
    if (!category) {
      toast.error("Category is required.");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }
    if (!offerPrice || isNaN(Number(offerPrice)) || Number(offerPrice) <= 0) {
      toast.error("Offer price must be a valid positive number.");
      return;
    }
    if (Number(offerPrice) > Number(price)) {
      toast.error("Offer price cannot be greater than the original price.");
      return;
    }

    // Check if at least one image file is selected
    const hasImage = files.some(file => file && file.size > 0);
    if (!hasImage) {
      toast.error("At least one product image is required.");
      return;
    }

    // Delete default file input entries to prevent empty/stale inputs, and append files from the react state
    formData.delete("images");
    files.forEach((file) => {
      if (file && file.size > 0) {
        formData.append("images", file);
      }
    });

    // Call the server action with the validated formData inside startTransition
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form id="add-product-form" onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" name="images" id={`image${index}`} accept="image/*" hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}

          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            name="name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            name="description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              defaultValue="Earphone"
            >
              <option value="Earphone">Earphone</option>
              <option value="Headphone">Headphone</option>
              <option value="Watch">Watch</option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop">Laptop</option>
              <option value="Camera">Camera</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              name="price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              name="offerPrice"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>
        {state?.error && (
          <p className="text-red-500 text-sm font-medium">{state.error}</p>
        )}
        <button type="submit" disabled={isPending} className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:opacity-50">
          {isPending ? "ADDING..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;