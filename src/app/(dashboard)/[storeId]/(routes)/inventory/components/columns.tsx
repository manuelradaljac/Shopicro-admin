"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

export type InventoryColumn = {
  id: string
  productName: string
  numberInStock: number
  isInStock: boolean
  updatedAt: string
}

export const columns: ColumnDef<InventoryColumn>[] = [
  {
    accessorKey: "product",
    header: "Proizvod",
    cell: ({row}) => row.original.productName
  },
  {
    accessorKey: "numberInStock",
    header: "Količina na zalihama",
  },
  {
    accessorKey: "isInStock",
    header: "Na zalihama",
  },
  {
    accessorKey: "updatedAt",
    header: "Zadnje ažurirano",
  },
  {
    accessorKey: "id",
    cell: ({ row }) => <CellAction data={row.original}/>
  },
]
