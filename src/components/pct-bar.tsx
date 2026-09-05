import { cn } from "@/lib/utils";

export function PctBar({
  value,
  label,
  hint,
  compact = false,
}: {
  value: number | null;
  label: string;
  hint?: string;
  compact?: boolean;
}) {
  const pct = value ?? 0;
  const tone =
    pct >= 80 ? "bg-good" : pct >= 55 ? "bg-accent" : pct >= 35 ? "bg-muted" : "bg-subtle";
  return (
    <div className="min-w-0">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className={cn("text-muted", compact ? "text-xs" : "text-sm")}>{label}</span>
        <span className="font-mono text-xs tabular-nums text-fg">
          {value == null ? "—" : `${Math.round(value)}`}
          <span className="text-subtle"> pct</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-raised">
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", tone)}
          style={{ width: `${Math.max(2, Math.min(100, pct))}%` }}
        />
      </div>
      {hint ? <p className="mt-1 text-xs leading-snug text-subtle">{hint}</p> : null}
    </div>
  );
}
