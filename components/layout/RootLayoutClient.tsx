"use client";

import { CartProvider } from "@/components/cart/CartContext";
import Navbar from "@/components/layout/Navbar";
import CartSidebar from "@/components/cart/CartSidebar";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <Navbar />
            <CartSidebar />
            <div className="pt-16 h-screen overflow-hidden">
                {children}
            </div>
        </CartProvider>
    );
}
