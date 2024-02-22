"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { Category } from "@prisma/client"

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
    header: "Hero sekcija",
    cell: ({row}) => row.original.heroLabel,
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
