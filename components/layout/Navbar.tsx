"use client";

import Link from "next/link";
import { ShoppingBag, Menu, User } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { cn } from "@/lib/utils"; // Assuming utils exists

export default function Navbar() {
    const { setIsOpen, items } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border h-16 flex items-center px-4 md:px-8 justify-between">
            <div className="flex items-center gap-8">
                <Link href="/" className="font-black text-xl tracking-tighter">
                    F\F
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                    <Link href="/studio" className="hover:text-foreground transition-colors">Studio</Link>
                    <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
                    <Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link>
                    <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Link href="/login" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <User size={20} />
                </Link>
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative p-2 hover:bg-muted rounded-full transition-colors"
                >
                    <ShoppingBag size={20} />
                    {items.length > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-foreground text-background text-[10px] font-bold flex items-center justify-center rounded-full">
                            {items.length}
                        </span>
                    )}
                </button>
                <button className="md:hidden p-2 hover:bg-muted rounded-full transition-colors">
                    <Menu size={20} />
                </button>
            </div>
        </nav>
    );
}
