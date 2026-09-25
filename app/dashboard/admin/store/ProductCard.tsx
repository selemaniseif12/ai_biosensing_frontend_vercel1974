"use client";

import React from "react";

interface Product {
  item_id: number;
  name: string;
  description: string;
  price_usd: number;
  billing_period: string;
  disabled?: boolean;
}

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>

      <div className="mt-3">
        <span className="font-bold">${Number(product.price_usd).toFixed(2)}</span>
        {product.billing_period !== "one_time" && (
          <span className="text-sm text-gray-500"> / {product.billing_period}</span>
        )}
      </div>

      {product.disabled ? (
        <button
          className="mt-4 bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
          disabled
        >
          Coming Soon
        </button>
      ) : (
        <button
          onClick={() => onAdd(product)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
