"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const pwRules = useMemo(() => [
        { label: "Min 8 characters", ok: password.length >= 8 },
        { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
        { label: "Lowercase letter", ok: /[a-z]/.test(password) },
        { label: "Number", ok: /[0-9]/.test(password) },
        { label: "Special character (!@#$%...)", ok: /[^A-Za-z0-9]/.test(password) },
    ], [password]);

    const pwValid = pwRules.every((r) => r.ok);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pwValid) { setError("Password does not meet all requirements."); return; }
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const supabase = createSupabaseBrowserClient();
            if (!supabase) {
                setError("Auth is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and restart the dev server.");
                return;
            }
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
                return;
            }

            if (data.session) {
                router.push("/");
                return;
            }

            setSuccess("Account created. Check your email to confirm your address, then sign in.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to sign up");
        } finally {
            setLoading(false);
        }
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground"
                            required
                        />
                    </div>
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
                        {password.length > 0 && (
                            <ul className="mt-2 space-y-1 text-xs">
                                {pwRules.map((r) => (
                                    <li key={r.label} className={r.ok ? "text-green-500" : "text-muted-foreground"}>
                                        {r.ok ? "✓" : "○"} {r.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {error ? (
                        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    ) : null}

                    {success ? (
                        <div className="rounded-md border border-border bg-secondary p-3 text-sm">
                            {success}
                        </div>
                    ) : null}

                    <button
                        disabled={loading || !pwValid}
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
