"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock register
        setTimeout(() => {
            router.push("/");
        }, 1000);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-tighter">Create Account</h1>
                    <p className="text-muted-foreground mt-2">Join the Future Fit community</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First name"
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full py-3 bg-foreground text-background font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Sign up"}
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account? <Link href="/login" className="text-foreground font-bold hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
