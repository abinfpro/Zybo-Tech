import { Order } from "@/lib/types";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl p-4 flex gap-6 items-center hover:bg-[#222] transition-colors group">
      <div className="w-24 h-24 bg-[#bef264]/20 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent"></div>
        <img
          src={order.product_image}
          alt={order.product_name}
          className="w-20 h-20 object-contain drop-shadow-xl"
        />
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-white text-lg font-bold">
              {order.product_name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Size: UK 7 | {order.order_id || "Standard"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-white font-bold block">
              ₹{order.product_price}
            </span>
            {order.product_mrp && (
              <span className="text-gray-500 text-xs line-through">
                ₹{order.product_mrp}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">{order.created_date}</div>
      </div>
    </div>
  );
}
