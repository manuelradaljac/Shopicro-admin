import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET! //ts pogreska fix -env ne prepoznaje
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Pogreska: ${error.message}`, {
      status: 400,
    });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true,
      },
    });

    const productIds = order.orderItems.map((orderItem) => orderItem.productId);
    // TODO ode da ima opcija da arhivira ili ne arhivira korisnik izabere ako je out of stock (ako prode z -> drz)

    const inventoryItems = await prismadb.inventory.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
    });

    try {
      for (const item of inventoryItems) {
        if (item.numberInStock > 1) {
          await prismadb.inventory.update({
            where: {
              id: item.id,
            },
            data: {
              numberInStock: {
                decrement: 1,
              },
            },
          });
        } else if (item.numberInStock === 1) {
          //updatea inventory record
          await prismadb.inventory.update({
            where: {
              id: item.id,
            },
            data: {
              numberInStock: 0,
              isInStock: false,
            },
          });
          //updatea product arhivira ga
          await prismadb.product.updateMany({
            where: {
              id: {
                in: [...productIds],
              },
            },
            data: {
              isArchived: true,
            },
          });
        }
      }
    } catch (error) {
      console.error("Failed to update inventory", error);
    }
  }

  return new NextResponse(null, { status: 200 });
}
