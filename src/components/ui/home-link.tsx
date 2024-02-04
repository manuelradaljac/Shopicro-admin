"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const HomeImageLink = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <>
      <Link href={`/${params.storeId}`}>
        <Image
          src="/shopicro.png"
          alt="logo"
          width="190"
          height="190"
          priority
        />
      </Link>
    </>
  );
};

export default HomeImageLink;
