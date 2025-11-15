"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { evaluateTardiness, humanizeMinutes, type TardinessProfile } from "@/lib/analysis";

export function TardinessCard({ profile }: { profile: TardinessProfile | null }) {
  if (!profile) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
        Feed the mirror your routine and it will mirror back your punctuality prophecy.
      </div>
    );
  }

  const callToAction =
    profile.riskLevel === "high"
      ? "Set a standing 15-minute buffer on every calendar invite starting tomorrow."
      : profile.riskLevel === "medium"
      ? "Lock a single ritual anchor for departures and guard it like a VIP list."
      : "Screenshot this result and brag to the group chat before entropy notices.";

  return (
    <div className="gradient-sheen flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
            Mirror Verdict
          </p>
          <h2 className="text-3xl font-semibold text-white">{profile.label}</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
          <SparklesIcon className="h-5 w-5 text-sky-300" />
          <span className="text-sm font-semibold text-white/80">Score {profile.score}/100</span>
        </div>
      </header>
      <p className="text-lg text-white/80">{profile.tagline}</p>
      <section className="grid gap-4 sm:grid-cols-2">
        <MetricTile label="Minutes late" value={humanizeMinutes(profile.minutesLate)} />
        <MetricTile label="Persona" value={profile.persona} />
        <MetricTile label="Forecast" value={profile.forecast} />
        <MetricTile label="Risk level" value={profile.riskLevel.toUpperCase()} tone={profile.riskLevel} />
      </section>
      <section className="rounded-2xl border border-white/10 bg-black/30 px-6 py-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
          Mirror Prescription
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-white/70">
          {profile.suggestions.map((suggestion, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </section>
      <footer className="rounded-2xl border border-white/10 bg-sky-400/10 px-6 py-5 text-sm text-white/80">
        <p className="font-semibold uppercase tracking-[0.2em] text-white/60">Immediate play</p>
        <p className="mt-2 text-white/80">{callToAction}</p>
      </footer>
    </div>
  );
}

function MetricTile({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone?: "low" | "medium" | "high";
}) {
  const toneColor = tone === "high" ? "text-rose-300" : tone === "medium" ? "text-sky-300" : "text-emerald-300";
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">{label}</p>
      <p className={`mt-2 text-lg font-semibold text-white ${tone ? toneColor : "text-white"}`}>{value}</p>
    </div>
  );
}
