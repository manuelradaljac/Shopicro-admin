'use server'

import prismadb from "@/lib/prisma";

export const getSalesNumber = async (storeId: string, numberOfDays: number) => {
  const dateFilter = new Date();
  dateFilter.setDate(dateFilter.getDate() - numberOfDays);

  const salesNumber = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
      createdAt: {
        gte: dateFilter,
      },
    },
  });

  return salesNumber;
};
