"use client";

import { useMemo, useState } from "react";
import { ChronotypeSelector, type ChronotypeValue } from "@/components/ChronotypeSelector";
import { AccountabilitySlider } from "@/components/AccountabilitySlider";
import { SlipHistoryChart } from "@/components/SlipHistoryChart";
import { TardinessCard } from "@/components/TardinessCard";
import { evaluateTardiness } from "@/lib/analysis";

const DEFAULT_SLIPS = [12, 8, 24, 18, 6, 35, 10];

export default function Page() {
  const [name, setName] = useState("You");
  const [expectedTime, setExpectedTime] = useState("09:00");
  const [actualTime, setActualTime] = useState("09:18");
  const [chronotype, setChronotype] = useState<ChronotypeValue>("twilight");
  const [accountability, setAccountability] = useState(4);
  const [slipInput, setSlipInput] = useState(DEFAULT_SLIPS.join(", "));
  const [activated, setActivated] = useState(false);

  const slipEvents = useMemo(() => parseSlipInput(slipInput, DEFAULT_SLIPS), [slipInput]);

  const profile = useMemo(() => {
    if (!activated) return null;
    const expectedMinutes = timeToMinutes(expectedTime);
    const actualMinutes = timeToMinutes(actualTime);
    if (expectedMinutes === null || actualMinutes === null) return null;

    return evaluateTardiness({
      name,
      expectedMinutes,
      actualMinutes,
      chronotype,
      accountabilityLevel: accountability,
      slipEvents
    });
  }, [activated, name, expectedTime, actualTime, chronotype, accountability, slipEvents]);

  return (
    <main className="relative flex min-h-screen flex-col gap-12 overflow-hidden bg-aurora px-6 pb-20 pt-16 sm:px-12">
      <div className="absolute -top-48 right-0 h-[480px] w-[480px] rounded-full bg-sky-400/10 blur-3xl" aria-hidden />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
            Ai Mirror Mirror
          </p>
          <h1 className="text-5xl font-semibold text-white sm:text-6xl">
            {name}'s punctuality truth serum
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            Feed the mirror your schedule rituals and it will project your tardiness aura. The math is
            messy, the honesty is not. Play with the levers, find the rhythm that stops time from
            laughing at you.
          </p>
        </header>
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <form
            className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-8"
            onSubmit={(event) => {
              event.preventDefault();
              setActivated(true);
            }}
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField label="Alias">
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value || "You")}
                  placeholder="Chronically Late"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 focus:border-sky-400/60 focus:outline-none"
                />
              </FormField>
              <FormField label="Expected time">
                <input
                  type="time"
                  value={expectedTime}
                  onChange={(event) => setExpectedTime(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 focus:border-sky-400/60 focus:outline-none"
                />
              </FormField>
              <FormField label="Actual arrival">
                <input
                  type="time"
                  value={actualTime}
                  onChange={(event) => setActualTime(event.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 focus:border-sky-400/60 focus:outline-none"
                />
              </FormField>
              <FormField label="Slip log (minutes late)">
                <input
                  value={slipInput}
                  onChange={(event) => setSlipInput(event.target.value)}
                  placeholder="6, 12, 24"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white placeholder:text-white/30 focus:border-sky-400/60 focus:outline-none"
                />
              </FormField>
            </div>
            <ChronotypeSelector value={chronotype} onChange={setChronotype} />
            <AccountabilitySlider value={accountability} onChange={setAccountability} />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full border border-sky-400/40 bg-sky-400/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-sky-300 hover:bg-sky-400/40"
            >
              Reflect me
            </button>
          </form>
          <div className="flex flex-col gap-8">
            <TardinessCard profile={profile} />
            <SlipHistoryChart values={slipEvents} />
          </div>
        </section>
      </div>
    </main>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-semibold uppercase tracking-[0.3em] text-white/60">{label}</span>
      {children}
    </label>
  );
}

function timeToMinutes(value: string): number | null {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function parseSlipInput(input: string, fallback: number[]): number[] {
  if (!input.trim()) return fallback;
  const parsed = input
    .split(/[,\s]+/)
    .map((token) => Number(token.trim()))
    .filter((value) => !Number.isNaN(value) && Number.isFinite(value) && value >= 0 && value <= 240);
  return parsed.length ? parsed : fallback;
}
