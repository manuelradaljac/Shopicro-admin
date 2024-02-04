import prismadb from "@/lib/prisma";

export const getStockNumber = async (storeId: string) => {
  const stockNumber = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false
    },
  });

  return stockNumber;

};