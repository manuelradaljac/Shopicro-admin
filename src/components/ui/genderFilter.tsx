import React from "react";
import Link from "next/link";

export default function GenderFilter() {
  return (
    <div className="flex w-1/3 gap-12">
      <Link href="#" className="pl-16">
        Muškarci
      </Link>
      <Link href="#" className="">
        Žene
      </Link>
    </div>
  );
}
