"use client";

import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import ChatMessage from "@/components/style-advisor/ChatMessage";

type Coords = { lat: number; lon: number };

export default function StyleAdvisorChat() {
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        setCoords(null);
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 4_000 },
    );
  }, []);

  const body = useMemo(() => ({ location: coords }), [coords]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    error,
  } = useChat({
    api: "/api/style-advisor",
    body,
  });

  const disabled = status !== "ready";

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      <div className="border-b border-border bg-background/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="text-2xl font-black tracking-tighter">
            Style Advisor
          </div>
          <div className="text-sm text-muted-foreground">
            Weather-aware picks for Future Fit tees + hoodies.
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="container mx-auto px-4 py-6">
          <div className="grid gap-3">
            {messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => (
                <ChatMessage
                  key={m.id}
                  role={m.role === "user" ? "user" : "assistant"}
                  parts={m.parts as unknown[]}
                />
              ))}
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error.message}
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-border bg-background/70 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <form
            className="flex gap-2"
            onSubmit={handleSubmit}
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder={
                coords
                  ? "Ask for an outfit based on today’s weather…"
                  : "Enable location for weather-aware picks…"
              }
              className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={disabled}
              className="h-11 rounded-full bg-foreground px-5 text-sm font-bold text-background disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
