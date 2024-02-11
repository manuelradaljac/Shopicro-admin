import prismadb from "@/lib/prisma";

import { InventoryForm } from "./components/inventory-form";

const CategoryPage = async ({
  params
}: {
  params: { inventoryId: string, storeId: string }
}) => {
  
  const inventory = await prismadb.inventory.findUnique({
    where: {
      id: params.inventoryId
    }
  });

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <InventoryForm products={products} initialData={inventory} />
      </div>
    </div>
  );
}

export default CategoryPage;