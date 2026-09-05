import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { MethodPanel } from "@/components/method-panel";
import { PlayerDetail } from "@/components/player-detail";
import { PlayerRow } from "@/components/player-row";
import { Headshot } from "@/components/headshot";
import { Button } from "@/components/ui/button";
import {
  board,
  playerId,
  sortPlayers,
  type BoardMode,
  type Player,
  type PosFilter,
  fmtAdp,
} from "@/lib/board";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const MODES: { id: BoardMode; label: string; blurb: string }[] = [
  { id: "breakout", label: "Breakouts", blurb: "Youth + sticky usage + room in ADP" },
  { id: "value", label: "Value", blurb: "Usage the market is still late on" },
  { id: "usage", label: "Usage", blurb: "Raw 2025 stickiness, stars included" },
];

function Home() {
  const [mode, setMode] = useState<BoardMode>("breakout");
  const [pos, setPos] = useState<PosFilter>("ALL");
  const [q, setQ] = useState("");
  const [minRoutes, setMinRoutes] = useState(200);
  const [methodOpen, setMethodOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = board.players.filter((p) => (p.routes ?? 0) >= minRoutes);
    if (pos !== "ALL") list = list.filter((p) => p.pos === pos);
    if (mode === "breakout") list = list.filter((p) => p.breakout_eligible);
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          (p.team ?? "").toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)),
      );
    }
    return sortPlayers(list, mode);
  }, [mode, pos, q, minRoutes]);

  const selectedFromTap =
    filtered.find((p) => playerId(p) === selectedId) ?? null;
  const desktopSelected = selectedFromTap ?? filtered[0] ?? null;

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <div className="relative mx-auto flex min-h-dvh max-w-[1400px] flex-col">
        <header className="border-b border-border px-4 pb-5 pt-6 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                SumerSports · 2025 usage → 2026
              </p>
              <h1 className="mt-2 font-display text-3xl font-medium tracking-[-0.03em] text-balance">
                STICK
              </h1>
              <p className="mt-2 max-w-xl text-pretty text-sm text-muted">
                Pass-catcher breakouts ranked on the metrics that actually stick:
                targets, air yards, WOPR, and how often the offense looks their way.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setMethodOpen(true)}>
              <SlidersHorizontal />
              Method
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-sm transition-colors duration-150",
                  mode === m.id
                    ? "border-accent bg-accent text-accent-fg"
                    : "border-border bg-surface text-muted hover:text-fg",
                )}
              >
                {m.label}
              </button>
            ))}
            <span className="hidden items-center pl-1 text-xs text-subtle sm:flex">
              {MODES.find((m) => m.id === mode)?.blurb}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search player, team, tag"
                suppressHydrationWarning
                className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-3 text-sm text-fg placeholder:text-subtle focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            </label>
            <div className="flex gap-1">
              {(["ALL", "WR", "TE"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPos(p)}
                  className={cn(
                    "h-11 min-w-11 rounded-lg border px-3 text-sm",
                    pos === p
                      ? "border-border-strong bg-raised text-fg"
                      : "border-border bg-surface text-muted",
                  )}
                >
                  {p === "ALL" ? "All" : p}
                </button>
              ))}
            </div>
            <label className="flex h-11 items-center gap-3 rounded-lg border border-border bg-surface px-3 text-xs text-muted">
              <span className="whitespace-nowrap">Min routes</span>
              <input
                type="range"
                min={80}
                max={500}
                step={20}
                value={minRoutes}
                suppressHydrationWarning
                onChange={(e) => setMinRoutes(Number(e.target.value))}
                className="w-24 accent-accent"
              />
              <span className="w-8 font-mono tabular-nums text-fg">{minRoutes}</span>
            </label>
          </div>
        </header>

        <RookieRail />

        <div className="grid flex-1 lg:grid-cols-[minmax(20rem,26rem)_minmax(0,1fr)]">
          <aside className="border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex items-baseline justify-between px-4 py-3 sm:px-5">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
                Board
              </h2>
              <span className="font-mono text-[11px] tabular-nums text-muted">
                {filtered.length} players
              </span>
            </div>
            <div className="max-h-[70vh] overflow-y-auto px-2 pb-4 lg:max-h-[calc(100dvh-22rem)]">
              {filtered.length === 0 ? (
                <p className="px-3 py-8 text-sm text-muted">No players match those filters.</p>
              ) : (
                filtered.map((p, i) => (
                  <PlayerRow
                    key={playerId(p)}
                    player={p}
                    mode={mode}
                    displayRank={i + 1}
                    selected={desktopSelected ? playerId(desktopSelected) === playerId(p) : false}
                    onSelect={() => setSelectedId(playerId(p))}
                  />
                ))
              )}
            </div>
          </aside>

          <section className="hidden min-w-0 lg:block">
            <div className="px-6 py-6 xl:px-10">
              {desktopSelected ? (
                <PlayerDetail player={desktopSelected} />
              ) : (
                <EmptyDetail />
              )}
            </div>
          </section>
        </div>
      </div>

      {selectedFromTap ? (
        <MobileDetail player={selectedFromTap} onClose={() => setSelectedId(null)} />
      ) : null}

      {methodOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/70 p-0 sm:items-center sm:p-6"
          onClick={() => setMethodOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setMethodOpen(false);
          }}
        >
          <div
            className="max-h-[88dvh] w-full max-w-3xl overflow-y-auto rounded-t-xl border border-border bg-surface p-5 sm:rounded-xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">How the board is built</h2>
              <Button variant="ghost" size="icon" onClick={() => setMethodOpen(false)} aria-label="Close">
                <X />
              </Button>
            </div>
            <MethodPanel />
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RookieRail() {
  if (board.rookies.length === 0) return null;
  return (
    <div className="border-b border-border px-4 py-3 sm:px-6 lg:px-8">
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
          2026 draftees · no NFL sample
        </h2>
        <span className="text-xs text-subtle">ADP only</span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {board.rookies.map((r) => (
          <div
            key={r.id}
            className="flex w-44 shrink-0 items-center gap-2.5 rounded-lg border border-border bg-surface px-2.5 py-2"
          >
            <Headshot src={r.headshot} name={r.name} team={r.team} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium">{r.name}</div>
              <div className="truncate font-mono text-[10px] text-muted">
                {r.pos} {r.team} · ADP {fmtAdp(r.adp_ppr)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileDetail({ player, onClose }: { player: Player; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-bg lg:hidden">
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-bg/95 px-2 py-2 backdrop-blur">
        <Button variant="ghost" size="md" onClick={onClose}>
          <ChevronLeft />
          Board
        </Button>
      </div>
      <div className="px-4 py-5">
        <PlayerDetail player={player} />
      </div>
    </div>
  );
}

function EmptyDetail() {
  return (
    <div className="flex h-full min-h-80 items-center justify-center text-sm text-muted">
      Select a player on the board.
    </div>
  );
}
