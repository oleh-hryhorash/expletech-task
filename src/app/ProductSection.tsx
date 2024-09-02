"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/20/solid";
import products from "@/app/products.json";

const PAGE_SIZE = 10;

const ProductSection = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sort = params.get("sort");
    const selectedCategories = params.get("categories")?.split(",") || [];
    const selectedColors = params.get("colors")?.split(",") || [];
    const selectedSizes = params.get("sizes")?.split(",") || [];

    let result = products.filter((product) => {
      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.categories[0])) &&
        (selectedColors.length === 0 ||
          selectedColors.includes(product.colors[0])) &&
        (selectedSizes.length === 0 || selectedSizes.includes(product.sizes[0]))
      );
    });

    if (sort === "Newest") {
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "Price Low - High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "Price High - Low") {
      result.sort((a, b) => b.price - a.price);
    }

    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    result = result.slice(startIndex, endIndex);

    setFilteredProducts(result);
  }, [searchParams, currentPage]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative group">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-md shadow-sm aspect-[4/5] object-cover object-top"
            />
            <div className="space-y-1 mt-4">
              <div>
                <p className="font-medium truncate">{product.title}</p>
              </div>
              <p className="line-clamp-2 text-slate-500 text-sm">
                {product.desc}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-semibold">Rs: {product.price}</p>
                <p className="flex gap-2 items-center mt-2">
                  <StarIcon className="w-5 -mt-.5 text-yellow-500" />
                  <span>4.2</span>
                </p>
              </div>
            </div>
            <Link
              href={`/product/${product.id}`}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span>View Details</span>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          className="p-2 border border-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((page) => page + 1)}
          className="p-2 border border-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
