import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function GET() {
    try {
        const key_id = process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            return NextResponse.json({ error: "Keys missing" });
        }

        const razorpay = new Razorpay({ key_id, key_secret });
        
        // Test account details
        const account = await razorpay.accounts.all();
        
        return NextResponse.json({
            success: true,
            key_prefix: key_id.substring(0, 8),
            account_type: account?.type || "unknown",
            account_id: account?.id || "unknown"
        });
    } catch (err) {
        return NextResponse.json({
            success: false,
            error: err instanceof Error ? err.message : "Unknown error"
        });
    }
}
