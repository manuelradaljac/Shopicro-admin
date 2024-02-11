import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl, textColor } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Ime hero sekcije je obavezno", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Slika hero sekcije je obavezna", {
        status: 400,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Id trgovine je obvezan", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const hero = await prismadb.hero.create({
      data: {
        label,
        imageUrl,
        textColor,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Id trgovine je obvezan", { status: 400 });
    }

    const heroes = await prismadb.hero.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(heroes);
  } catch (error) {
    console.log("[HERO_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
