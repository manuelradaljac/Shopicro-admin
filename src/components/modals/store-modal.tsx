"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from 'sonner'
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axios.post('/api/stores', values)

      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error('Nešto je pošlo po krivu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title="Stvori trgovinu"
      description="Stvori novu trgovinu za upravljanje proizvodima i kategorijama"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ime trgovine</FormLabel>
                    <FormControl>
                      <Input disabled={loading} className="placeholder:text-gray-400 text-gray-100" placeholder="E-Commerce" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button onClick={storeModal.onClose} disabled={loading}>Poništi</Button>
                <Button variant="outline" type="submit" disabled={loading}>Dalje</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
