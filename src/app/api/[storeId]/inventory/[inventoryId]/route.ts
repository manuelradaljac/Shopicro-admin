import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { inventoryId: string } }
) {
  try {
    if (!params.inventoryId) {
      return new NextResponse("Id proizvoda je obvezan", { status: 400 });
    }

    const product = await prismadb.inventory.findUnique({
      where: {
        id: params.inventoryId,
      },
      include: {
        Product: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; inventoryId: string, productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { isInStock, numberInStock } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.inventoryId) {
      return new NextResponse("Id inventara je obvezan", { status: 400 });
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

    const inventory = await prismadb.inventory.update({
      where: {
        id: params.inventoryId,
      },
      data: {
        numberInStock,
        isInStock,
      },
    });

    if (isInStock === true) {
      await prismadb.product.updateMany({
        where: {
          id: params.productId,
        },
        data: {
          isArchived: false,
        },
      });
    }

    return NextResponse.json(inventory);
  } catch (error) {
    console.log("[INVENTORY_PATCH_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
