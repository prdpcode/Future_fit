"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Ruler, Weight, User, ChevronRight } from "lucide-react";
import { type Gender, type BodyShape, type FitResult, recommendSize } from "@/lib/fit-finder";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type Step = 1 | 2 | 3 | 4;

const BODY_SHAPES: { id: BodyShape; label: string; desc: string; icon: string }[] = [
    { id: "slim", label: "Slim", desc: "Lean build, narrow shoulders", icon: "🧍" },
    { id: "regular", label: "Regular", desc: "Average proportions", icon: "🧑" },
    { id: "athletic", label: "Athletic", desc: "Muscular, wider shoulders", icon: "💪" },
    { id: "broad", label: "Broad", desc: "Wider frame, fuller build", icon: "🏋️" },
];

const SIZE_COLORS: Record<string, string> = {
    XS: "from-blue-500 to-cyan-400",
    S: "from-teal-500 to-emerald-400",
    M: "from-green-500 to-lime-400",
    L: "from-yellow-500 to-orange-400",
    XL: "from-orange-500 to-red-400",
    XXL: "from-red-500 to-pink-400",
};

export default function FitFinderPage() {
    const [step, setStep] = useState<Step>(1);
    const [gender, setGender] = useState<Gender | null>(null);
    const [heightCm, setHeightCm] = useState("");
    const [weightKg, setWeightKg] = useState("");
    const [bodyShape, setBodyShape] = useState<BodyShape | null>(null);
    const [chestCm, setChestCm] = useState("");
    const [waistCm, setWaistCm] = useState("");
    const [result, setResult] = useState<FitResult | null>(null);

    const canNext = (): boolean => {
        switch (step) {
            case 1: return gender !== null;
            case 2: return Number(heightCm) >= 100 && Number(heightCm) <= 250 && Number(weightKg) >= 25 && Number(weightKg) <= 250;
            case 3: return bodyShape !== null;
            default: return false;
        }
    };

    const handleNext = () => {
        if (step < 3) {
            setStep((step + 1) as Step);
        } else if (step === 3 && gender && bodyShape) {
            const res = recommendSize({
                gender,
                heightCm: Number(heightCm),
                weightKg: Number(weightKg),
                bodyShape,
                chestCm: chestCm ? Number(chestCm) : undefined,
                waistCm: waistCm ? Number(waistCm) : undefined,
            });
            setResult(res);
            setStep(4);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep((step - 1) as Step);
    };

    const handleReset = () => {
        setStep(1);
        setGender(null);
        setHeightCm("");
        setWeightKg("");
        setBodyShape(null);
        setChestCm("");
        setWaistCm("");
        setResult(null);
    };

    const progress = step === 4 ? 100 : ((step - 1) / 3) * 100;

    return (
        <>
        <BreadcrumbSchema 
            items={[
                { name: "Home", url: "https://wearfuturefit.com/" },
                { name: "AI Fit Finder", url: "https://wearfuturefit.com/fit-finder" }
            ]}
        />
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-lg space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                        <Sparkles size={14} /> AI-Powered
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter">AI Fit Finder</h1>
                    <p className="text-muted-foreground">Find your perfect size in 30 seconds</p>
                </div>

                {/* Progress bar */}
                {step < 4 && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Step {step} of 3</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-foreground rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                )}

                {/* Step 1: Gender */}
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold">What best describes you?</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {(["male", "female"] as Gender[]).map((g) => (
                                <button key={g} onClick={() => setGender(g)}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-center space-y-2
                                        ${gender === g
                                            ? "border-foreground bg-foreground/5 scale-[1.02]"
                                            : "border-border hover:border-foreground/40 hover:bg-secondary"}`}>
                                    <div className="text-4xl">{g === "male" ? "👨" : "👩"}</div>
                                    <div className="font-semibold capitalize">{g}</div>
                                    {gender === g && (
                                        <div className="absolute top-3 right-3 w-5 h-5 bg-foreground text-background rounded-full flex items-center justify-center text-xs">✓</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Measurements */}
                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold">Your measurements</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Ruler size={14} /> Height (cm) *
                                </label>
                                <input type="number" placeholder="170" value={heightCm}
                                    onChange={(e) => setHeightCm(e.target.value)}
                                    min={100} max={250}
                                    className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground text-lg font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                    <Weight size={14} /> Weight (kg) *
                                </label>
                                <input type="number" placeholder="70" value={weightKg}
                                    onChange={(e) => setWeightKg(e.target.value)}
                                    min={25} max={250}
                                    className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground text-lg font-medium" />
                            </div>
                        </div>

                        <div className="border-t border-border pt-4">
                            <p className="text-xs text-muted-foreground mb-3">Optional — for a more accurate recommendation:</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Chest (cm)</label>
                                    <input type="number" placeholder="96" value={chestCm}
                                        onChange={(e) => setChestCm(e.target.value)}
                                        min={50} max={180}
                                        className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Waist (cm)</label>
                                    <input type="number" placeholder="82" value={waistCm}
                                        onChange={(e) => setWaistCm(e.target.value)}
                                        min={40} max={180}
                                        className="w-full p-3 bg-secondary rounded-md outline-none focus:ring-2 focus:ring-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Body Shape */}
                {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-bold">Select your body shape</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {BODY_SHAPES.map((s) => (
                                <button key={s.id} onClick={() => setBodyShape(s.id)}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left space-y-1
                                        ${bodyShape === s.id
                                            ? "border-foreground bg-foreground/5 scale-[1.02]"
                                            : "border-border hover:border-foreground/40 hover:bg-secondary"}`}>
                                    <div className="text-2xl">{s.icon}</div>
                                    <div className="font-semibold text-sm">{s.label}</div>
                                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                                    {bodyShape === s.id && (
                                        <div className="absolute top-3 right-3 w-5 h-5 bg-foreground text-background rounded-full flex items-center justify-center text-xs">✓</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Result */}
                {step === 4 && result && (
                    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                        <div className="text-center space-y-4">
                            <div className={`inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br ${SIZE_COLORS[result.size] || "from-gray-500 to-gray-400"} text-white shadow-lg shadow-foreground/10`}>
                                <span className="text-4xl font-black">{result.size}</span>
                            </div>
                            <h2 className="text-2xl font-black">Your Recommended Size</h2>
                            <p className="text-muted-foreground">{result.tip}</p>
                        </div>

                        <div className="bg-secondary rounded-xl p-5 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">BMI</span>
                                <span className="font-medium">{result.bmi}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Confidence</span>
                                <span className={`font-medium ${result.confidence === "high" ? "text-green-500" : "text-yellow-500"}`}>
                                    {result.confidence === "high" ? "High" : "Medium"}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Height</span>
                                <span className="font-medium">{heightCm} cm</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Weight</span>
                                <span className="font-medium">{weightKg} kg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Body type</span>
                                <span className="font-medium capitalize">{bodyShape}</span>
                            </div>
                        </div>

                        {result.confidence === "medium" && (
                            <p className="text-xs text-muted-foreground text-center">
                                Add chest &amp; waist measurements for a higher confidence recommendation.
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={handleReset}
                                className="flex items-center justify-center gap-2 py-3 border border-border rounded-md font-bold hover:bg-secondary transition-colors">
                                <RotateCcw size={16} /> Try Again
                            </button>
                            <Link href="/shop"
                                className="flex items-center justify-center gap-2 py-3 bg-foreground text-background font-bold rounded-md hover:opacity-90 transition-opacity">
                                Shop Now <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                {step < 4 && (
                    <div className="flex gap-3">
                        {step > 1 && (
                            <button onClick={handleBack}
                                className="flex items-center justify-center gap-2 flex-1 py-3 border border-border rounded-md font-bold hover:bg-secondary transition-colors">
                                <ArrowLeft size={16} /> Back
                            </button>
                        )}
                        <button onClick={handleNext} disabled={!canNext()}
                            className={`flex items-center justify-center gap-2 py-3 bg-foreground text-background font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 ${step > 1 ? "flex-1" : "w-full"}`}>
                            {step === 3 ? (
                                <><Sparkles size={16} /> Get My Size</>
                            ) : (
                                <>Next <ArrowRight size={16} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}
