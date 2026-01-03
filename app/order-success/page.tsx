import Link from "next/link";
import OrderCard from "@/components/order/OrderCard";
import { Order } from "@/lib/types";
import Image from "next/image";

interface SearchParams {
  [key: string]: string | undefined;
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const order: Order = {
    order_id: params.order_id || "",
    product_name: params.product_name || "",
    product_mrp: Number(params.product_mrp) || 0,
    product_price: Number(params.product_price) || 0,
    product_image: params.product_image || "",
    created_date: params.created_date || "",
    product_amount: Number(params.total_amount) || 0,
    quantity: Number(params.quantity) || 0,
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Image src="/logo.png" width={100} height={100} alt="tick_logo" />
      </div>

      <h1 className="text-3xl font-bold mb-2">Successfully Ordered!</h1>
      <p className="text-gray-500 mb-8">{order.created_date}</p>

      <div className="w-full max-w-md">
        <OrderCard order={order} />
      </div>

      <Link
        href="/products"
        className="mt-12 text-gray-400 hover:text-white underline underline-offset-4"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
