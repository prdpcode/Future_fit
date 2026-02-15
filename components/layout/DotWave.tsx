"use client";

import { useEffect, useRef } from "react";

export default function DotWave() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width: number;
        let height: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const GAP = 30; // Distance between dots
        const RADIUS = 1; // Dot radius
        const SCALE = 1.5; // Scale factor on hover
        const AREA = 150; // Interaction radius

        const dots: { x: number; y: number; originX: number; originY: number }[] = [];

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            dots.length = 0;
            for (let x = 0; x < width; x += GAP) {
                for (let y = 0; y < height; y += GAP) {
                    dots.push({ x, y, originX: x, originY: y });
                }
            }
        };

        const draw = () => {
            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Set color based on theme (naive implementation, assumes light/dark toggle exists or system pref)
            // Ideally we'd hook into next-themes properly, but for now let's use a subtle color
            // that works on both or adapts.
            // Let's use computed style to get the current foreground color to be safe?
            // Actually, simpler: use a low opacity generic color that works on both.
            // On dark mode (black bg), white dots with low opacity.
            // On light mode (white bg), black dots with low opacity.

            // Robust dark mode detection compatible with CSS media queries
            const isDark = document.documentElement.classList.contains("dark") ||
                window.matchMedia('(prefers-color-scheme: dark)').matches;

            // Increased opacity for better visibility
            ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";

            dots.forEach((dot) => {
                const dx = mouseX - dot.x;
                const dy = mouseY - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Wave effect logic
                // If mouse is near, move dot away or scale it
                let size = RADIUS;

                // Simple wave: displace slightly away from mouse
                if (dist < AREA) {
                    const force = (AREA - dist) / AREA;

                    // Displace
                    // dot.x = dot.originX - (dx * force * 0.5);
                    // dot.y = dot.originY - (dy * force * 0.5);

                    // Or just scale up
                    size = RADIUS + (SCALE * force);
                } else {
                    // Return to origin (spring would be better but simple lerp for now if needed, 
                    // but here we just calculate position directly effectively)
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);

        init();
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none"
            aria-hidden="true"
        />
    );
}
