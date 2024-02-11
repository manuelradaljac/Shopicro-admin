import prismadb from "@/lib/prisma";
import { SizeForm } from "./components/size-form";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const sizes = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
    include: {
      categories: true,
    }
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizes}/>
      </div>
    </div>
  );
};

export default SizePage;
