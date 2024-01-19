"use client"

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductData {
  ime_proizvoda: string;
  slika_proizvoda: string;
  cijena: number;
  boje: string;
  velicine: string;
  id: number;
}

export default function Product({ product }: { product: ProductData }) {
  const valuta = "€";

  return (
    <div className="flex flex-col outline h-fit w-fit py-10 text-center items-center justify-center rounded-xl select-none">
      <Image
        src={product.slika_proizvoda}
        height="500"
        width="350"
        alt="yeezy"
        className="w-full h-auto"
        priority
      ></Image>
      <h3 className="text-3xl">{product.ime_proizvoda}</h3>
      <h3 className="text-lg">24 boje</h3>
      <div className="flex flex-col gap-2 mt-5">
        <Button
          variant="default"
          className="bg-purple-500 hover:bg-purple-600 hover:tra w-64 rounded-2xl"
        >
          kupi
        </Button>
        <Button
          variant="default"
          className="bg-gray-500 hover:bg-gray-600 w-64 rounded-2xl"
        >
          Dodaj u košaricu
        </Button>
        <p className="text-2xl mt-5">
          {product.cijena}
          {valuta}
        </p>
      </div>
    </div>
  );
}