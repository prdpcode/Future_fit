"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    customized?: boolean;
    size?: string;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") return [];
        const saved = window.localStorage.getItem("future-fit-cart");
        if (!saved) return [];
        try {
            return JSON.parse(saved) as CartItem[];
        } catch (e) {
            console.error("Failed to load cart", e);
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem("future-fit-cart", JSON.stringify(items));
    }, [items]);

    const addItem = (item: CartItem) => {
        // Basic ID generation for demo if not provided unique
        const newItem = { ...item, id: item.id || Math.random().toString(36).substring(2, 11) };
        setItems((prev) => [...prev, newItem]);
        setIsOpen(true);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const total = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, isOpen, setIsOpen, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
