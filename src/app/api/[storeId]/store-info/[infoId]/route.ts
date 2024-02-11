import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { storeInfoId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeInfoId) {
      return new NextResponse("Id trgovine je obavezan", { status: 400 });
    }
    
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeInfoId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const storeInfo = await prismadb.storeSettings.findMany({
      where: {
        storeId: params.storeInfoId,
      },
    });

    return NextResponse.json(storeInfo);
  } catch (error) {
    console.log("[STORE-INFO_GET_METHOD]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
