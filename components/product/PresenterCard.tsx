"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Product, VariationColor } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

interface PresenterCardProps {
  product: Product;
  selectedColor: VariationColor;
  selectedSizeId: number | null;
  onColorSelect: (idx: number) => void;
  onSizeSelect: (id: number) => void;
  onBuyNow: (e: React.MouseEvent) => void;
}

const PresenterCard = ({
  product,
  selectedColor,
  selectedSizeId,
  onColorSelect,
  onSizeSelect,
  onBuyNow,
}: PresenterCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tittleRef = useRef<HTMLDivElement>(null);
  const BackgroundTextRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = useAuth();
  // Background Color Transition
  useEffect(() => {
    if (arcRef.current) {
      gsap.to(arcRef.current, {
        backgroundColor: getHexColor(selectedColor?.color_name),
        duration: 0.7,
        ease: "power2.out",
      });
    }
  }, [selectedColor]);

  // Main Hover Timeline
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const tittle = tittleRef.current;
    const controls = controlsRef.current;
    const backgroundText = BackgroundTextRef.current;

    if (!card || !image || !controls || !backgroundText) return;

    // Initial State for controls
    const controlChildren = controls.children;
    gsap.set(controlChildren, { opacity: 0, y: 15 });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      image,
      {
        y: -40,
        rotate: -2,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    )
      .to(
        tittleRef.current,
        {
          y: -105,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        backgroundText,
        {
          y: -70,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        arcRef.current,
        {
          scale: 0.9,
          y: -10,
          x: 20,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      )
      .to(
        controlChildren,
        {
          opacity: 1,
          y: -25,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      tl.kill();
    };
  }, []);

  const handleBtnHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    enter: boolean
  ) => {
    gsap.to(e.currentTarget, {
      scale: enter ? 1.1 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBuyBtnActive = (
    e: React.MouseEvent<HTMLButtonElement>,
    active: boolean
  ) => {
    gsap.to(e.currentTarget, {
      scale: active ? 0.95 : 1.1,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const productImage =
    selectedColor?.color_images[0] ||
    "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg";

  return (
    <div
      ref={cardRef}
      className="relative p-8 overflow-hidden cursor-pointer group aspect-[4/5] flex flex-col items-center bg-[#1A1A1A]"
    >
      {/* Dynamic Background Arc/Circle */}
      <div
        ref={arcRef}
        className="absolute bottom-60 -right-1/3 w-[500px] h-[500px] rounded-full  pointer-events-none"
        style={{ backgroundColor: getHexColor(selectedColor?.color_name) }}
      ></div>

      {/* Large faint background text */}
      <div
        ref={BackgroundTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] z-0"
      >
        <h1 className="text-[160px] font-black italic uppercase tracking-tighter">
          {product.name.split(" ")[0]}
        </h1>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-58 z-20 flex items-center justify-center mt-4">
        <img
          ref={imageRef}
          src={productImage}
          alt={product.name}
          className="w-[110%] h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transform will-change-transform"
        />
      </div>

      {/* Product Name */}
      <div
        ref={tittleRef}
        className="absolute bottom-20 pt-5 z-10 text-center w-full mt-8"
      >
        <h2 className="text-white text-xl font-bold uppercase tracking-tighter leading-tight drop-shadow-md">
          {product.name}
        </h2>
      </div>

      {/* Controls Container */}
      <div
        ref={controlsRef}
        className="z-10 w-full mt-6 space-y-5 flex flex-col items-center"
      >
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm font-bold tracking-widest uppercase">
            Size:
          </span>
          <div className="flex gap-2">
            {selectedColor?.sizes?.slice(0, 4).map((size) => (
              <button
                key={size.size_id}
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSizeSelect(size.size_id);
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                  selectedSizeId === size.size_id
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/5 text-white"
                }`}
              >
                {size.size_name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm font-bold tracking-widest uppercase">
            Color:
          </span>
          <div className="flex gap-3">
            {product.variation_colors.map((variation, idx) => (
              <button
                key={variation.color_id}
                onMouseEnter={(e) => handleBtnHover(e, true)}
                onMouseLeave={(e) => handleBtnHover(e, false)}
                onClick={(e) => {
                  e.stopPropagation();
                  onColorSelect(idx);
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedColor?.color_id === variation.color_id
                    ? "ring-2 ring-white ring-offset-4 ring-offset-[#1A1A1A]"
                    : ""
                }`}
                style={{ backgroundColor: getHexColor(variation.color_name) }}
              />
            ))}
          </div>
        </div>

        <button
          ref={buttonRef}
          onMouseEnter={(e) => handleBtnHover(e, true)}
          onMouseLeave={(e) => handleBtnHover(e, false)}
          onMouseDown={(e) => handleBuyBtnActive(e, true)}
          onMouseUp={(e) => handleBuyBtnActive(e, false)}
          onClick={onBuyNow}
          disabled={!isAuthenticated}
          className="w-fit px-5 bg-white text-black font-black uppercase tracking-tighter py-2 rounded-l mt-2 shadow-xl"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

function getHexColor(color?: string) {
  if (!color) return "#333";
  const c = color.toLowerCase();
  if (c.includes("green")) return "#bef264";
  if (c.includes("red")) return "#991b1b";
  if (c.includes("purple")) return "#6b21a8";
  if (c.includes("white")) return "#bef264";
  if (c.includes("black")) return "#000000";
  return "#333";
}

export default PresenterCard;
