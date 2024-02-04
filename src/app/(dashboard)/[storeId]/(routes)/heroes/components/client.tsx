"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { HeroColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface HeroClientProps{
  data: HeroColumn[]
}

export const HeroClient: React.FC<HeroClientProps> = ({
  data
}) => {
  
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Hero sekcije (${data.length})`}
          description="Upravljajte hero sekcijama vaše web trgovine"
        />
        <Button onClick={() => router.push(`/${params.storeId}/heroes/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Dodaj novu
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label"  columns={columns} data={data}/>
    </>
  );
};
