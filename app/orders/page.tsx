import OrderCard from "@/components/order/OrderCard";
import { getOrders } from "@/lib/api";

export default async function OrdersPage() {
  const { count, orders } = await getOrders();
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.order_id} order={order} />
          ))}

          {count === 0 && (
            <div className="text-center text-gray-400 py-12">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
