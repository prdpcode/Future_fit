import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { orderRateLimit } from "@/lib/upstash-ratelimit";
import { RazorpayOrderSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
    // Upstash rate limiting
    const identifier = req.headers.get('x-forwarded-for') || 
                       req.headers.get('x-real-ip') || 
                       'unknown';
    
    const { success, limit, remaining, reset } = await orderRateLimit.limit(identifier);
    
    if (!success) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { 
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                }
            }
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
        const body = await req.json();
        
        // Zod validation
        const validationResult = RazorpayOrderSchema.safeParse(body);
        
        if (!validationResult.success) {
            return NextResponse.json(
                { 
                    error: "Invalid input", 
                    details: validationResult.error.errors 
                },
                { status: 400 }
            );
        }
        
        const { amount, currency = "INR", receipt } = validationResult.data;

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
        }, {
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString(),
            }
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
