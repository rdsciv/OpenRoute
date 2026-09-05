import { ArrowUpRight, Route } from "lucide-react";
import { Headshot } from "@/components/headshot";
import { PctBar } from "@/components/pct-bar";
import { Button } from "@/components/ui/button";
import { board, type Player, fmtAdp, fmtNum, fmtPct, yearLabel } from "@/lib/board";
import { teamLabel } from "@/lib/teams";

const METRIC_VALUE: Record<string, (p: Player) => string> = {
  target_share: (p) => fmtPct(p.target_share),
  air_yards_share: (p) => fmtPct(p.air_yards_share),
  wopr: (p) => fmtNum(p.wopr, 2),
  tprr: (p) => fmtNum(p.tprr, 2),
  routes_tprr: (p) => `${fmtNum(p.routes, 0)} · ${fmtNum(p.tprr, 2)}`,
  fd_per_route: (p) => fmtNum(p.fd_per_route, 3),
  yprr: (p) => fmtNum(p.yprr, 2),
  deep: (p) => `${fmtNum(p.rec_20, 0)} rec 20+`,
  output: (p) => `${fmtNum(p.tds, 0)} TD · ${fmtPct(p.catch_pct, 0)} catch`,
};

export function PlayerDetail({ player }: { player: Player }) {
  const year = yearLabel(player.years_exp);
  return (
    <article className="flex flex-col gap-6">
      <header className="flex items-start gap-4">
        <Headshot src={player.headshot} name={player.name} team={player.team} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
            {player.pos} · {player.team ?? "FA"} {teamLabel(player.team)}
            {player.team_2025 && player.team && player.team !== player.team_2025
              ? ` · was ${player.team_2025}`
              : ""}
          </p>
          <h2 className="mt-1 font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-balance">
            {player.name}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {[year, player.age ? `Age ${player.age}` : null, player.college]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {player.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {player.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border bg-raised px-2.5 py-1 text-[11px] text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        <Stat label="Breakout" value={fmtNum(player.breakout, 0)} accent />
        <Stat label="Stickiness" value={fmtNum(player.stickiness, 0)} />
        <Stat label="WOPR" value={fmtNum(player.wopr, 2)} />
        <Stat label="TPRR" value={fmtNum(player.tprr, 2)} />
        <Stat label="ADP" value={fmtAdp(player.adp_ppr)} />
        <Stat label="2025 PPR" value={fmtNum(player.ppr_2025, 0)} />
      </div>

      <section>
        <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          Stickiness profile
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {board.metrics.map((m) => (
            <div key={m.id} className="rounded-lg border border-border bg-surface p-3">
              <div className="mb-2 flex items-baseline justify-between gap-2">
                <span className="text-xs text-muted">
                  {m.rank}. {m.label}
                </span>
                <span className="font-mono text-xs tabular-nums text-fg">
                  {METRIC_VALUE[m.id]?.(player) ?? "—"}
                </span>
              </div>
              <PctBar
                value={player.pcts[m.id as keyof Player["pcts"]]}
                label={`${m.stickiness} stickiness`}
                compact
              />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-4 sm:p-5">
        <h3 className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          Why this rank
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-fg/90">{player.why}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs text-muted sm:grid-cols-4">
          <Factor k="Youth" v={player.factors.youth} />
          <Factor k="Opportunity" v={player.factors.opportunity} />
          <Factor k="Role path" v={player.factors.role_expansion} />
          <Factor k="ADP value" v={player.factors.adp_value} />
        </dl>
      </section>

      <section className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Routes" value={fmtNum(player.routes, 0)} />
        <Stat label="Targets" value={fmtNum(player.targets, 0)} />
        <Stat label="ADoT" value={fmtNum(player.adot, 1)} />
        <Stat label="YPRR" value={fmtNum(player.yprr, 2)} />
        <Stat label="1D / route" value={fmtNum(player.fd_per_route, 3)} />
        <Stat label="Air yards" value={fmtNum(player.air_yards, 0)} />
        <Stat label="Catch %" value={fmtPct(player.catch_pct, 0)} />
        <Stat label="Sep (NGS)" value={fmtNum(player.separation, 2)} />
      </section>

      {player.ss_url ? (
        <Button variant="outline" size="md" asChild>
          <a href={player.ss_url} target="_blank" rel="noreferrer">
            <Route />
            Open on SumerSports
            <ArrowUpRight />
          </a>
        </Button>
      ) : null}
    </article>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2.5">
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">{label}</div>
      <div
        className={`mt-1 font-mono text-base tabular-nums ${accent ? "text-accent" : "text-fg"}`}
      >
        {value}
      </div>
    </div>
  );
}

function Factor({ k, v }: { k: string; v: number }) {
  return (
    <div>
      <dt className="text-subtle">{k}</dt>
      <dd className="tabular-nums text-fg">{v.toFixed(2)}×</dd>
    </div>
  );
}
