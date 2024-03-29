import prismadb from "@/lib/prisma";
import { ColorsClient } from "./components/client";
import { ColorColumn } from "./components/columns";
import { format } from "date-fns"

const ColorsPage = async ({
  params
}: {
  params: {storeId: string}
}) => {

  const colors = await prismadb.color.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  const formatiraneBoje: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorsClient data={formatiraneBoje}/>
      </div>
    </div>
  );
};

export default ColorsPage;
