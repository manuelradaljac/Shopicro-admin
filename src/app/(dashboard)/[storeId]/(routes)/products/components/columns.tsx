"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime proizvoda",
  },
  {
    accessorKey: "isArchived",
    header: "Arhivirano",
  },
  {
    accessorKey: "isFeatured",
    header: "Istaknuto",
  },
  {
    accessorKey: "price",
    header: "Cijena",
  },
  {
    accessorKey: "category",
    header: "Kategorija",
  },
  {
    accessorKey: "size",
    header: "Veličina",
  },
  {
    accessorKey: "color",
    header: "Boja",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-3">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor: row.original.color}}/>
      </div>
    ),
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
