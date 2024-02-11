"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Hero } from "@prisma/client";
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
import ImageUpload from "./image-upload";
interface HeroFormProps {
  initialData: Hero | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  textColor: z.string().default("#fff").optional(),
});

type HeroFormValues = z.infer<typeof formSchema>;

export const HeroForm: React.FC<HeroFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Uredi hero sekciju" : "Dodaj hero sekciju";
  const description = initialData
    ? "Uredi postojeću hero sekciju"
    : "Dodaj novu hero sekciju";
  const toastMsg = initialData
    ? "Hero sekcija uspješno uređena"
    : "Hero sekcija stvorena";
  const action = initialData ? "Spremi promjene" : "Stvori";

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
      textColor: "",
    },
  });

  const onSubmit = async (data: HeroFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/heroes/${params.heroId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/heroes`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/heroes/`);
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
      await axios.delete(`/api/${params.storeId}/heroes/${params.heroId}`);
      router.refresh();
      router.push(`/${params.storeId}/heroes`);
      toast.success("Hero sekcija uspješno izbrisana");
    } catch (error: any) {
      toast.error(
        "Pobrinite se da prvo izbrišete sve kategorije u kojima se ova hero sekcija koristi"
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pozadinska slika</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tekst hero sekcije</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Ime hero sekcije"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Boja teksta</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-5">
                      <Input
                        disabled={loading}
                        placeholder="hex vrijednost boje"
                        {...field}
                      />
                      <div className="border p-5 rounded-full" style={{ backgroundColor: field.value}}/>
                    </div>
                  </FormControl>
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
