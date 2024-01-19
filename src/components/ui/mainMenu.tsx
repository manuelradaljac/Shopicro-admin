import React from "react";
import Link from "next/link";

export default function MainMenu() {

  return (
    <div>
        <div className="flex gap-16 items-center justify-center mt-8 text-xl">
          <Link href="#">Tenisice</Link>
          <Link href="#">Kratke majice</Link>
          <Link href="#">Hudice</Link>
          <Link href="#">Jakete</Link>
          <Link href="#">Hlače</Link>
          <Link href="#">Nakit</Link>
          <Link href="#">Ostalo</Link>
        </div>
    </div>
  );
}
