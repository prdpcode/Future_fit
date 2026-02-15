"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { CheckCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Get order details from URL params or sessionStorage
    const orderId = searchParams.get("order_id");
    const paymentId = searchParams.get("payment_id");
    const amount = searchParams.get("amount");
    const email = searchParams.get("email") || "wearfuturefit@gmail.com"; // Default for testing
    
    // Try to get order details from sessionStorage if not in URL
    const orderDetails = sessionStorage.getItem("future_fit_order");
    let orderData = null;
    
    if (orderDetails) {
      try {
        orderData = JSON.parse(orderDetails);
      } catch (e) {
        console.error("Failed to parse order details");
      }
    }
    
    // Fire PartnerStack conversion only once
    if (typeof window !== "undefined" && (window as any).growsumo) {
      const finalAmount = amount || (orderData?.total || 0);
      const finalOrderId = orderId || orderData?.paymentId || paymentId || "unknown";
      
      // Convert paise to rupees for PartnerStack
      const amountInRupees = Number(finalAmount) / 100;
      
      (window as any).growsumo.data("purchase", {
        customer_key: email,
        amount: amountInRupees,
        transaction_key: finalOrderId,
      });
      
      // Clear sessionStorage to prevent duplicate tracking
      sessionStorage.removeItem("future_fit_order");
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
        <CheckCircle size={40} />
      </div>
      <h1 className="text-4xl font-black mb-4 tracking-tighter">Order Confirmed!</h1>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        Your gear is being prepped. You&apos;ll receive a confirmation email shortly.
      </p>
      <a
        href="/"
        className="px-8 py-4 bg-foreground text-background rounded-full font-bold hover:scale-105 transition-transform"
      >
        Back to Home
      </a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
