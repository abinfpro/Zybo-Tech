"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                {isOpen ? <X /> : <Menu />}
            </button>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black/95 border-b border-gray-800 p-4 flex flex-col gap-4 z-50 animate-in slide-in-from-top duration-200">
                    <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-200">
                        New Drops
                    </Link>
                    <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-200">
                        Men
                    </Link>
                    <Link href="/products" onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-200">
                        Women
                    </Link>
                </div>
            )}
        </div>
    );
}
