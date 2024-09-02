
"use client"; 

import { useRouter } from 'next/navigation';
import products from '@/app/products.json';
import Image from 'next/image';
import React from 'react';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = products.find(p => p.id === parseInt(id));
  const router = useRouter();

  if (!product) {
    return <p>Product not found</p>;
  }


  const goBack = () => {
    router.push('/'); 
  };

  return (
    <main className="max-w-6xl mx-auto mt-10 px-4">
      <button onClick={goBack} className="mb-4 text-blue-500">
        &larr; Back to Products
      </button>
      <div className="flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={600}
          height={600}
          className="rounded-md shadow-sm"
        />
        <h1 className="text-3xl font-bold mt-4">{product.title}</h1>
        <p className="text-lg mt-2">{product.desc}</p>
        <p className="text-xl font-semibold mt-4">Price: Rs {product.price}</p>
      </div>
    </main>
  );
};

export default ProductDetailPage;
