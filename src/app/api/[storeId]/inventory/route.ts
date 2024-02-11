import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    /*const { userId } = auth();

    if(!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Id trgovine je obavezan", { status: 400 });
    }*/

    const inventory = await prismadb.inventory.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.log("[INVENTORY_GET_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
