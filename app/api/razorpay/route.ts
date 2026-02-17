import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { SecurityValidator, RateLimiter } from "@/lib/security";

export async function POST(req: NextRequest) {
    // Rate limiting based on IP
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    if (!RateLimiter.isAllowed(clientIP, 5, 60000)) { // 5 requests per minute
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
        );
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Debug logging
    console.log("Environment check:", {
        key_id: key_id ? "present" : "missing",
        key_secret: key_secret ? "present" : "missing",
        node_env: process.env.NODE_ENV
    });

    if (!key_id || !key_secret) {
        return NextResponse.json(
            { error: "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local." },
            { status: 500 }
        );
    }

    try {
        const { amount, currency = "INR", receipt } = await req.json();

        // Validate input
        if (!SecurityValidator.validateAmount(amount)) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        // Validate currency
        if (currency !== "INR") {
            return NextResponse.json({ error: "Invalid currency" }, { status: 400 });
        }

        // Validate receipt if provided
        if (receipt && (typeof receipt !== 'string' || receipt.length > 50)) {
            return NextResponse.json({ error: "Invalid receipt" }, { status: 400 });
        }

        const razorpay = new Razorpay({ key_id, key_secret });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency,
            receipt: receipt || `rcpt_${Date.now()}`,
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: key_id,
        });
    } catch (err) {
        console.error("Razorpay order error:", err);
        console.error("Error details:", {
            message: err instanceof Error ? err.message : "Unknown error",
            stack: err instanceof Error ? err.stack : undefined,
            key_id_prefix: key_id?.substring(0, 8) || "missing",
            key_secret_length: key_secret?.length || 0
        });
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Failed to create order" },
            { status: 500 }
        );
    }
}
