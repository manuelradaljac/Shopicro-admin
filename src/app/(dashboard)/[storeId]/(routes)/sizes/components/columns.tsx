"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizeColumn = {
  id: string
  name: string
  value: string
  createdAt: string
}

export type CategoriesSelectorProps = {
  id: string;
  name: string;
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime",
  },
  {
    accessorKey: "value",
    header: "Vrijednost",
  },
  {
    accessorKey: "createdAt",
    header: "Stvoreno",
  },
  {
    accessorKey: "id",
    cell: ({ row }) => <CellAction  data={row.original}/>
  },
]
