import prismadb from "@/lib/prisma";
import { InventoryClient } from "./components/client";
import { InventoryColumn } from "./components/columns";
import { format } from "date-fns"

const InventoryPage = async ({
  params
}: {
  params: {storeId: string}
}) => {

  const inventory = await prismadb.inventory.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      Product: true,
    },
    orderBy:{
      updatedAt: 'desc'
    }
  })

  const formatiraniInventar: InventoryColumn[] = inventory.map((item) => ({
    id: item.id,
    productName: item.Product.name,
    numberInStock: item.numberInStock,
    isInStock: item.isInStock,
    updatedAt: format(item.updatedAt, "dd.MM.yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <InventoryClient data={formatiraniInventar}/>
      </div>
    </div>
  );
};

export default InventoryPage;
