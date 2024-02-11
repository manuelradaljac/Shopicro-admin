import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, price, categoryId, colorId, sizeId, images, isFeatured, isArchived, numberInStock } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Ime proizvoda je obavezno", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Slika proizvoda je obavezna", {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse("Cijena proizvoda je obavezna", {
        status: 400,
      });
    }

    if (!colorId) {
      return new NextResponse("Boja proizvoda je obavezna", {
        status: 400,
      });
    }

    if (!categoryId) {
      return new NextResponse("Kategorija proizvoda je obavezna", {
        status: 400,
      });
    }

    if (!sizeId) {
      return new NextResponse("Veličina proizvoda je obavezna", {
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

    const slug = slugify(name);

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        slug,
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });

    const inventory = await prismadb.inventory.create({
      data: {
        productId: product.id,
        numberInStock,
        isInStock: numberInStock > 0, 
        storeId: params.storeId,
      },
    });

    return NextResponse.json({product, inventory});
  } catch (error) {
    console.log("[PRODUCT_POST_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Id trgovine je obvezan", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
        Inventory: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
