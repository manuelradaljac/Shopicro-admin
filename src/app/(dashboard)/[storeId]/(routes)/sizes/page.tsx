import prismadb from "@/lib/prisma";
import { SizeClient } from "./components/client";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
import { CategoriesSelectorProps } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string, categoryId: string } }) => {  
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatiraneKategorije: CategoriesSelectorProps[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const formatiraneVelicine: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formatiraneVelicine}/>
      </div>
    </div>
  );
};

export default SizesPage;
