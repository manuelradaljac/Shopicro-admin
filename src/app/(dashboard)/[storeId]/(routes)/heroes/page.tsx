import prismadb from "@/lib/prisma";
import { HeroClient } from "./components/client";
import { HeroColumn } from "./components/columns";
import { format } from "date-fns"

const HeroPage = async ({
  params
}: {
  params: {storeId: string}
}) => {

  const heroes = await prismadb.hero.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  const formatiranHero: HeroColumn[] = heroes.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <HeroClient data={formatiranHero}/>
      </div>
    </div>
  );
};

export default HeroPage;
