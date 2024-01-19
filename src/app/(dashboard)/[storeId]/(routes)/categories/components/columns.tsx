"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type CategoryColumn = {
  id: string
  name: string
  heroLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime",
  },
  {
    accessorKey: "hero",
    header: "Hero kategorije",
    cell: ({row}) => row.original.heroLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Datum",
  },
  {
    accessorKey: "id",
    cell: ({ row }) => <CellAction  data={row.original}/>
  },
]
