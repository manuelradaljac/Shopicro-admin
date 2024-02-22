"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}/heroes`,
      label: "Hero sekcije",
      active: pathname === `/${params.storeId}/heroes`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Kategorije",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Veličine",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Boje",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Proizvodi",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/inventory`,
      label: "Inventar",
      active: pathname === `/${params.storeId}/inventory`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Narudžbe",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Postavke",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
        key={route.href}
        href={route.href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )}
      >
        {route.label}
    </Link>
      ))}
    </nav>
  );
};

export default MainNav;
