"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter, useParams } from "next/navigation";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <Heading
        title={`Narudžbe (${data.length})`}
        description="Upravljajte narudžbama vaše web trgovine"
      />
      <Separator />
      <DataTable searchKey="phone" columns={columns} data={data} />
    </>
  );
};
