"use client";

import { useId } from "react";

export function AccountabilitySlider({
  value,
  onChange
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const id = useId();
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70"
      >
        Accountability Field
      </label>
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="range"
          min={0}
          max={10}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-sky-400"
        />
        <span className="w-12 text-right text-sm font-semibold text-sky-300">{value}/10</span>
      </div>
      <p className="text-sm text-white/60">
        How intense is your accountability infrastructure? Group chats, shared calendars, reputation
        stakes.
      </p>
    </div>
  );
}
