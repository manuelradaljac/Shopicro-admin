import prismadb from "@/lib/prisma";
import { CategoryClient } from "./components/client";
import { CategoryColumn } from "./components/columns";
import { format } from "date-fns"

const CategoryPage = async ({
  params
}: {
  params: {storeId: string}
}) => {

  const categories = await prismadb.category.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      hero: true,
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  const formatiranaKategorija: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    heroLabel: item.hero.label,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatiranaKategorija}/>
      </div>
    </div>
  );
};

export default CategoryPage;
