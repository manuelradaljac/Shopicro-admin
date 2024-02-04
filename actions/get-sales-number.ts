import prismadb from "@/lib/prisma";

export const getSalesNumber = async (storeId: string) => {
  const salesNumber = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });

  return salesNumber;

};