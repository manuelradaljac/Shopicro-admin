import React from "react";
import Image from "next/image";
import Link from "next/link";
import { currentUser } from '@clerk/nextjs';

export default async function LogoCenterMainMenu() {

  const user = await currentUser();

  return (
    <div className="flex flex-col w-1/3 justify-center items-center select-none">
      <Link href="/">
        <Image
          src="/crorx_logo.png"
          alt="Logo"
          width="165"
          height="165"
          className="w-auto h-auto select-none"
          priority
        ></Image>
      </Link>
       {user ? <p>Samo za tebe {user?.firstName}</p> : null}
    </div>
  );
}
