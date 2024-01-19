"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id: string
  phone: string
  address: string,
  isPaid: boolean,
  totalPrice: string
  products: string
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Naručeni proizvodi",
  },
  {
    accessorKey: "phone",
    header: "Broj telefona",
  },
  {
    accessorKey: "address",
    header: "Adresa",
  },
  {
    accessorKey: "totalPrice",
    header: "Ukupna cijena",
  },
  {
    accessorKey: "isPaid",
    header: "Plaćeno",
  },
]
