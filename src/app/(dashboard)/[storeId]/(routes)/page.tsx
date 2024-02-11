import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { priceFormatter } from "@/lib/utils";
import { CreditCard, Euro, Landmark, Package2 } from "lucide-react";
import { getTotalRevenue } from "../../../../../actions/get-total-revenue";
import { getSalesNumber } from "../../../../../actions/get-sales-number";
import { getStockNumber } from "../../../../../actions/get-stock-number";
import { getGraphRevenue } from "../../../../../actions/get-graph-revenue";
import { getStripeBalance } from "../../../../../actions/get-stripe-balance";
import { Overview } from "@/components/overview";
import Link from "next/link";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesNumber = await getSalesNumber(params.storeId);
  const stockNumber = await getStockNumber(params.storeId);
  const chartData = await getGraphRevenue(params.storeId);
  const stripeBalance = await getStripeBalance()

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Početna stranica"
          description="Glavna stranica za upravljanje vašom web trgovinom"
        />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Ukupni promet</CardTitle>
              <Euro className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {priceFormatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Sredstva dostupna za isplatu</CardTitle>
              <Landmark className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stripeBalance}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="hover:underline">
                <Link href={``}>Narudžbe</Link>
              </CardTitle>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesNumber}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Proizvoda u trgovini</CardTitle>
              <Package2 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockNumber}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Pregled</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
