import prismadb from "@/lib/prisma";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns"
import { priceFormatter } from "@/lib/utils";
import { CheckIcon, X } from "lucide-react";

const OrdersPage = async ({
  params
}: {
  params: {storeId: string}
}) => {

  const orders = await prismadb.order.findMany({
    where:{
      storeId: params.storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  const formatiranaNarudzba: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: priceFormatter.format(item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
  }))

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatiranaNarudzba}/>
      </div>
    </div>
  );
};

export default OrdersPage;
