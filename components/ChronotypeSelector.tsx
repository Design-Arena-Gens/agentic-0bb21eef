"use client";

import { RadioGroup } from "@headlessui/react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const chronotypeOptions = [
  {
    id: "sunrise" as const,
    title: "Sunrise Strategist",
    description: "Up before the group chat wakes. You probably stretch for fun.",
    accent: "from-sky-400/80 to-emerald-400/70"
  },
  {
    id: "twilight" as const,
    title: "Twilight Flex",
    description: "Productive pre-game energy. Meetings booked after 10am only please.",
    accent: "from-fuchsia-400/70 to-sky-500/60"
  },
  {
    id: "midnight" as const,
    title: "Midnight Wizard",
    description: "Sunset is when you clock in. Time is a flat circle anyway.",
    accent: "from-purple-500/80 to-rose-400/60"
  }
];

export type ChronotypeValue = typeof chronotypeOptions[number]["id"];

export function ChronotypeSelector({
  value,
  onChange
}: {
  value: ChronotypeValue;
  onChange: (value: ChronotypeValue) => void;
}) {
  return (
    <RadioGroup value={value} onChange={onChange} className="flex flex-col gap-3">
      <RadioGroup.Label className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
        Chronotype
      </RadioGroup.Label>
      {chronotypeOptions.map((option) => (
        <RadioGroup.Option key={option.id} value={option.id} className="focus:outline-none">
          {({ checked }) => (
            <div
              className={clsx(
                "gradient-sheen relative flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 transition",
                checked ? "scale-[1.01] border-white/30" : "hover:border-white/20"
              )}
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <SparklesIcon className="h-4 w-4 text-sky-300" />
                <span>{option.title}</span>
              </div>
              <p className="text-sm text-white/70">{option.description}</p>
              <div
                aria-hidden
                className={clsx(
                  "pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition",
                  checked && "opacity-100"
                )}
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`
                }}
              />
              <div
                aria-hidden
                className={clsx(
                  "pointer-events-none absolute inset-px rounded-[22px] bg-gradient-to-br opacity-0 transition",
                  checked && "opacity-20",
                  option.accent
                )}
              />
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
