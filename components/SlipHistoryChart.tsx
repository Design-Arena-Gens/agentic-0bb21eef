"use client";

import clsx from "clsx";

export function SlipHistoryChart({ values }: { values: number[] }) {
  if (values.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
        Log at least one arrival gap to unlock trend gossip.
      </div>
    );
  }

  const max = Math.max(...values, 30);
  const min = Math.min(...values, 0);
  const count = values.length;
  const points = values.map((value, index) => {
    const x = (index / Math.max(1, count - 1)) * 100;
    const y = ((value - min) / Math.max(1, max - min)) * 100;
    return `${x},${100 - y}`;
  });

  const hoverLabels = values.map((value, index) => (
    <div
      key={`${value}-${index}`}
      className="flex flex-col items-center gap-1 text-xs text-white/70"
      style={{
        left: `${(index / Math.max(1, count - 1)) * 100}%`
      }}
    >
      <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5">
        {value}m
      </span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Day {index + 1}</span>
    </div>
  ));

  return (
    <div className="gradient-sheen relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            Slip Tape
          </h3>
          <p className="text-sm text-white/60">
            Latest arrival gaps in minutes. Lower is sharper.
          </p>
        </div>
        <span className="text-sm font-semibold text-white/80">
          Median {median(values)}m
        </span>
      </div>
      <div className="relative mt-6 h-32">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke="url(#spark)"
            strokeWidth={2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-x-3 bottom-2 top-3">
          <div className="relative h-full">
            {hoverLabels.map((label, index) => (
              <div
                key={index}
                className={clsx(
                  "pointer-events-none absolute -translate-x-1/2 opacity-0 transition-opacity duration-300",
                  index === values.length - 1 && "opacity-100"
                )}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }
  return sorted[mid];
}
