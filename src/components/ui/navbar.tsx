import { UserButton, auth } from "@clerk/nextjs";

import MainNav from "@/components/main-nav";
import StoreSwitcher from "../store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prisma";
import Image from "next/image";
import HomeImageLink from "./home-link";
import { ModeToggle } from "../theme-switcher";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex justify-center items-center mt-5">
        <HomeImageLink />
      </div>
      <div className="flex h-16 items-center justify-between w-full px-4 gap-5">
        <StoreSwitcher items={stores} />
        <div className="mr-[11vw]">
          <MainNav className="mx-6" />
        </div>
        <div className="w-fit flex justify-end items-end space-x-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
