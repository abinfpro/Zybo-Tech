"use client";

import { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { purchaseProduct } from "@/lib/api";
import PresenterCard from "./PresenterCard";

interface CardContainerProps {
  product: Product;
}

export default function CardContainer({ product }: CardContainerProps) {
  const router = useRouter();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);

  const selectedColor = product.variation_colors[selectedColorIdx];

  useEffect(() => {
    if (selectedColor?.sizes?.length > 0) {
      setSelectedSizeId(selectedColor.sizes[0].size_id);
    }
  }, [selectedColor]);

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const { order } = await purchaseProduct({ product_id: product.id });
      const params = new URLSearchParams({
        order_id: order.order_id,
        product_name: order.product_name,
        product_image: order?.product_image ?? "",
        product_mrp: product.mrp.toString(),
        product_price: order.product_price.toString(),
        created_date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        quantity: order.quantity.toString(),
      });

      router.push(`/order-success?${params.toString()}`);
    } catch (err) {
      console.error("Purchase failed", err);
      alert("Purchase failed. Please try again or login.");
    }
  };

  const handleColorSelect = (idx: number) => {
    setSelectedColorIdx(idx);
  };

  const handleSizeSelect = (id: number) => {
    setSelectedSizeId(id);
  };

  return (
    <PresenterCard
      product={product}
      selectedColor={selectedColor}
      selectedSizeId={selectedSizeId}
      onColorSelect={handleColorSelect}
      onSizeSelect={handleSizeSelect}
      onBuyNow={handleBuyNow}
    />
  );
}
