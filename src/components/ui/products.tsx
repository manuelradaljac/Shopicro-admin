import React from "react";
import Product from "./product";
import prisma from "@/lib/prisma";

export default async function Products({ numberOfProducts }: { numberOfProducts: number }) {
  const productList = await prisma.proizvodi.findMany();

  const productsArray = productList.slice(0, numberOfProducts).map((product) => (
    <Product product={product} key={product.id} />
  ));

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-3xl pt-5 pl-12">Najnovije</h1>
      <div className="flex flex-wrap items-stretch justify-center gap-12 mt-6 h-fit">
        {productsArray}
      </div>
    </div>
  );
}
