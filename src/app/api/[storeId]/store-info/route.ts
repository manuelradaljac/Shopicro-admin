import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params.storeId) {
        return new NextResponse("Id trgovine je obavezan", { status: 400 });
      }
  
      const storeInfo = await prismadb.storeSettings.findFirst({
        where: {
          storeId: params.storeId,
        },
        select: {
            logo: true, 
        }
      });
  
      return NextResponse.json(storeInfo);
    } catch (error) {
      console.log("[STORE-INFO_GET_METHOD]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  }
  