import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prisma"

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({params}) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  
  return (
    <div>
      <Separator />
    </div>
  )
}

export default DashboardPage