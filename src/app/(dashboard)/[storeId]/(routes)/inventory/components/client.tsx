"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { InventoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface InventoryClientProps{
  data: InventoryColumn[]
}

export const InventoryClient: React.FC<InventoryClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Inventar proizvoda (${data.length})`}
          description="Upravljajte inventarom vaše web trgovine"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj novi proizvod
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="product" columns={columns} data={data}/>
    </>
  );
};
