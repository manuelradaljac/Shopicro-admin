import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { heroId: string } }
) {
  try {
    if (!params.heroId) {
      return new NextResponse("Id hero sekcije je obvezan", { status: 400 });
    }

    const hero = await prismadb.hero.findUnique({
      where: {
        id: params.heroId,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; heroId: string } }
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

    if (!params.heroId) {
      return new NextResponse("Id hero sekcije je obvezan", { status: 400 });
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

    const hero = await prismadb.hero.updateMany({
      where: {
        id: params.heroId,
      },
      data: {
        label,
        imageUrl,
        textColor,
      },
    });

    return NextResponse.json(hero);
  } catch (error) {
    console.log("[HERO_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { heroId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.heroId) {
      return new NextResponse("Hero id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const Hero = await prismadb.hero.deleteMany({
      where: {
        id: params.heroId,
      },
    });

    return NextResponse.json(Hero);
  } catch (error) {
    console.log("[CATEGORY_DELETE_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
