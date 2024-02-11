import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, logo } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    let storeSettings;
    const existingStoreSettings = await prismadb.storeSettings.findFirst({
      where: {
        storeId: params.storeId,
      },
    });

    if (existingStoreSettings) {
      storeSettings = await prismadb.storeSettings.update({
        where: {
          id: existingStoreSettings.id,
        },
        data: {
          logo,
        },
      });
    } else {
      storeSettings = await prismadb.storeSettings.create({
        data: {
          storeId: params.storeId,
          logo,
        },
      });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json({ store, storeSettings });
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      if(!params.storeId){
          return new NextResponse("Store id is required", { status: 400 })
      }
  
      const store = await prismadb.store.deleteMany({
          where:{
              id: params.storeId,
              userId
          }
      })
  
      return NextResponse.json(store)
  
    } catch (error) {
      console.log("[STORE_DELETE]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
