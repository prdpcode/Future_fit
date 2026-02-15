"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/components/cart/CartContext";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

declare global {
    interface Window {
        Razorpay: new (options: Record<string, unknown>) => { open: () => void };
    }
}

type CheckoutState = "form" | "processing" | "success" | "error";

export default function CheckoutPage() {
    const { items, total } = useCart();
    const [state, setState] = useState<CheckoutState>("form");
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");

    const formValid = name && email && phone && address && city && pincode && items.length > 0;

    const loadRazorpayScript = (): Promise<boolean> =>
        new Promise((resolve) => {
            if (window.Razorpay) { resolve(true); return; }
            const s = document.createElement("script");
            s.src = "https://checkout.razorpay.com/v1/checkout.js";
            s.onload = () => resolve(true);
            s.onerror = () => resolve(false);
            document.body.appendChild(s);
        });

    const handlePay = async () => {
        if (!formValid) return;
        setError(null);
        setLoading(true);

        try {
            // 1. Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) { setError("Failed to load Razorpay. Check your internet."); setLoading(false); return; }

            // 2. Create order on server
            const res = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: total }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || "Failed to create order"); setLoading(false); return; }

            // 3. Open Razorpay checkout
            setState("processing");
            const options: Record<string, unknown> = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: "Future Fit",
                description: `Order of ${items.length} item(s)`,
                order_id: data.orderId,
                prefill: { name, email, contact: phone },
                theme: { color: "#000000" },
                handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
                    // 4. Verify payment
                    try {
                        const verifyRes = await fetch("/api/razorpay/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(response),
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.verified) {
                            setPaymentId(verifyData.paymentId);
                            setState("success");
                        } else {
                            setError("Payment verification failed.");
                            setState("error");
                        }
                    } catch {
                        setError("Payment verification failed.");
                        setState("error");
                    }
                },
                modal: {
                    ondismiss: () => {
                        setState("form");
                        setLoading(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
            setState("form");
            setLoading(false);
        }
    };

    // Success state
    if (state === "success") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                    <CheckCircle size={40} />
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tighter">Order Confirmed!</h1>
                <p className="text-xl text-muted-foreground max-w-md mb-4">
                    Your gear is being prepped for the future. You&apos;ll receive an email confirmation shortly.
                </p>
                {paymentId && (
                    <p className="text-sm text-muted-foreground mb-8">Payment ID: {paymentId}</p>
                )}
                <Link
                    href="/"
                    className="px-8 py-4 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-transform"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    // Empty cart
    if (items.length === 0 && state === "form") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <ShoppingBag size={48} className="text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                <p className="text-muted-foreground mb-6">Add some items before checking out.</p>
                <Link href="/shop" className="px-6 py-3 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 overflow-y-auto h-full">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
                <ArrowLeft size={16} /> Continue Shopping
            </Link>

            <h1 className="text-3xl font-black tracking-tighter mb-8">Checkout</h1>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Shipping form — 3 cols */}
                <div className="md:col-span-3 space-y-4">
                    <h2 className="text-lg font-bold mb-2">Shipping Details</h2>
                    <input
                        type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                        />
                        <input
                            type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                        />
                    </div>
                    <input
                        type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                        />
                        <input
                            type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" required
                        />
                    </div>
                </div>

                {/* Order summary — 2 cols */}
                <div className="md:col-span-2">
                    <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                    <div className="space-y-3 mb-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg bg-card">
                                <div className="w-14 h-14 bg-muted rounded-md relative overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                    {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                                    <p className="text-sm font-semibold mt-1">{formatCurrency(item.price)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="text-green-500 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <button
                        onClick={handlePay}
                        disabled={!formValid || loading}
                        className="w-full mt-6 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Processing..." : `Pay ${formatCurrency(total)}`}
                    </button>

                    <p className="text-xs text-center text-muted-foreground mt-3">
                        Secured by Razorpay. UPI, Cards, Wallets accepted.
                    </p>
                </div>
            </div>
        </div>
    );
}
