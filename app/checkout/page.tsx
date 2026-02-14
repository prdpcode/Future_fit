"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function CheckoutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle size={40} />
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tighter">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground max-w-md mb-8">
                Your gear is being prepped for the future. You will receive an email confirmation shortly.
            </p>
            <Link
                href="/"
                className="px-8 py-4 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-transform"
            >
                Back to Home
            </Link>
        </div>
    );
}
