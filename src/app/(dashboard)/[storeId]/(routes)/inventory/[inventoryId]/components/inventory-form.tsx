"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Inventory, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface InventoryFormProps {
  initialData: Inventory | null;
  products: Product[];
}

const formSchema = z.object({
  productId: z.string().min(1),
  numberInStock: z.coerce.number().min(1 ,{ message: "Broj mora biti veći od 0" }),
  isInStock: z.boolean(),
});

type InventoryFormValues = z.infer<typeof formSchema>;

export const InventoryForm: React.FC<InventoryFormProps> = ({ initialData, products }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Ažuriraj inventar" : "Dodaj Inventar";
  const description = initialData
    ? "Ažuriraj stanje inventara proizvoda"
    : "Dodaj novu Kategoriju";
  const toastMsg = initialData
    ? "Inventar uspješno ažuriran"
    : "Inventar stvoren";
  const action = initialData ? "Spremi promjene" : "Stvori";

  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
    }
  : {
      productId: "",
      numberInStock: 1,
      isInStock: true,
    },
  });

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/inventory/${params.inventoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/inventory`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/inventory/`);
      router.refresh();
      toast.success(toastMsg);
    } catch (error) {
      toast.error("Nešto je pošlo po krivu");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/inventory/${params.categoryId}`);
      router.refresh();
      router.push(`/${params.storeId}/inventory`);
      toast.success("Inventar uspješno izbrisan");
    } catch (error: any) {
      toast.error(
        "Pobrinite se da prvo izbrišete sve proizvode u kojima se ova kategorija koristi"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="h-6 w-5" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proizvod</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                  <FormControl>
                    <SelectTrigger disabled className="font-semibold">
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Odaberi proizvod"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Broj proizvoda na zalihi</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Ime kategorije"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=""></div>
            <FormField
              control={form.control}
              name="isInStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-4 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      required
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Proizvod na zalihama</FormLabel>
                    <FormDescription>
                      Ako proizvod nije na zalihama neće se prikazivati u web shopu
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
