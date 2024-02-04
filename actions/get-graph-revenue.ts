import prismadb from "@/lib/prisma";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphRevenue = async (storeId: string): Promise<GraphData[]> => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const monthlyRevenue: {[key: number]: number} = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Siječanj", total: 0 },
    { name: "Veljača", total: 0 },
    { name: "Ožujak", total: 0 },
    { name: "Travanj", total: 0 },
    { name: "Svibanj", total: 0 },
    { name: "Lipanj", total: 0 },
    { name: "Srpanj", total: 0 },
    { name: "Kolovoz", total: 0 },
    { name: "Rujan", total: 0 },
    { name: "Listopad", total: 0 },
    { name: "Studeni", total: 0 },
    { name: "Prosinac", total: 0 },
  ];

  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};