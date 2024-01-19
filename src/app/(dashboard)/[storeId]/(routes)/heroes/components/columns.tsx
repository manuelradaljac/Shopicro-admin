"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type HeroColumn = {
  id: string
  label: string
  createdAt: string
}

export const columns: ColumnDef<HeroColumn>[] = [
  {
    accessorKey: "label",
    header: "Ime",
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
