import prismadb from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { productId: string }}
) {
  try {
    if (!params.productId) {
      return new NextResponse("Id proizvoda je obvezan", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        slug: params.productId,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
        Inventory: true
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
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
      numberInStock
    } = body;

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

    if (!params.productId) {
      return new NextResponse("Id proizvoda je obvezan", { status: 400 });
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

    const slug = slugify(name);

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
        slug,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    let inventoryData = {
      numberInStock: numberInStock,
      ...(isArchived === false && numberInStock > 0 && { isInStock: true })
    };

    // Update inventory
    const inventory = await prismadb.inventory.update({
      where: { productId: params.productId },
      data: inventoryData,
    });

    //TODO napravit opciju da se nastavi prodavat proizvod nakon sto ode out of stock al da ima pie chart na pocetnoj warning ili push notification (ako prode zupanijsko)

    return NextResponse.json({product, inventory});
  } catch (error) {
    console.log("[PRODUCT_PATCH_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.productId) {
      return new NextResponse("Id proizvoda je obavezan", { status: 400 });
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
    
    await prismadb.inventory.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json({ product });
  } catch (error) {
    console.log("[PRODUCT_DELETE_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

