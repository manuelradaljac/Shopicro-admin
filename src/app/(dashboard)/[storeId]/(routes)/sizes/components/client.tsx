"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface SizeClientProps{
  data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({
  data
}) => {
  
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Veličine (${data.length})`}
          description="Upravljajte veličinama vaše web trgovine"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj novu
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name"  columns={columns} data={data}/>
    </>
  );
};
