import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_secret) {
        return NextResponse.json({ error: "Razorpay not configured" }, { status: 500 });
    }

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expected = crypto
            .createHmac("sha256", key_secret)
            .update(body)
            .digest("hex");

        if (expected === razorpay_signature) {
            // Payment verified — in production, save order to DB here
            return NextResponse.json({ verified: true, paymentId: razorpay_payment_id });
        }

        return NextResponse.json({ verified: false, error: "Invalid signature" }, { status: 400 });
    } catch (err) {
        console.error("Razorpay verify error:", err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : "Verification failed" },
            { status: 500 }
        );
    }
}
