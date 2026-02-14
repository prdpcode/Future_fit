"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const contentRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Calculate skew based on velocity
    // Velocity is pixels per second. 
    // We want a subtle effect, so we map a large range of velocity to a small skew angle.
    const skewY = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]);

    // Optional: We could also add a "y" transform for custom smooth scrolling behavior (Lenis-like), 
    // but for now let's just do the requested "3D effect" (skew) on the native scroll.
    // If we wanted full smooth scroll (inertial), we'd need a library like Lenis or a more complex setup.
    // The user asked for "3D scrolling effect", which usually implies this skew/distortion.

    return (
        <motion.div
            ref={contentRef}
            style={{ skewY }}
            className="w-full min-h-screen"
        >
            {children}
        </motion.div>
    );
}
