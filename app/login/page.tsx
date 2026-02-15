"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const supabase = createSupabaseBrowserClient();
            if (!supabase) {
                setError("Auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and restart the dev server.");
                return;
            }
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (signInError) {
                setError(signInError.message);
                return;
            }
            router.push("/");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-black tracking-tighter">Please sign in</h1>
                    <p className="text-muted-foreground mt-2">To access your saved designs</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>

                    {error ? (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    ) : null}

                    <button
                        disabled={loading}
                        className="w-full py-3 bg-foreground text-background font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
                </div>

                <div className="space-y-4">
                    <Link href="/" className="block w-full py-3 text-center border border-border rounded-md font-bold hover:bg-secondary transition-colors">
                        Continue as Guest
                    </Link>
                    <p className="text-center text-sm text-muted-foreground">
                        Don&apos;t have an account? <Link href="/register" className="text-foreground font-bold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
