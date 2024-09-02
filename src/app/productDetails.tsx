import React from 'react';
import { useRouter } from 'next/router';
import products from './products.json';
import Image from 'next/image';

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === parseInt(id as string));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <Image src={product.image} alt={product.title} width={500} height={500} className="rounded-md shadow-sm object-cover" />
      <div className="mt-4">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="text-slate-700 mt-2">{product.desc}</p>
        <p className="text-xl font-semibold mt-4">Rs: {product.price}</p>
        <p className="mt-2">Colors: {product.colors.join(', ')}</p>
        <p className="mt-2">Sizes: {product.sizes.join(', ')}</p>
        <p className="mt-2">Categories: {product.categories.join(', ')}</p>
        <p className="mt-2">Created At: {product.createdAt}</p>
      </div>
    </div>
  );
};

export default ProductDetails;