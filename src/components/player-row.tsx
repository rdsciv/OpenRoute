import { Headshot } from "@/components/headshot";
import {
  type BoardMode,
  type Player,
  fmtAdp,
  fmtNum,
  scoreOf,
} from "@/lib/board";
import { cn } from "@/lib/utils";

export function PlayerRow({
  player,
  mode,
  displayRank,
  selected,
  onSelect,
}: {
  player: Player;
  mode: BoardMode;
  displayRank: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const score = scoreOf(player, mode);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150",
        "hover:bg-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        selected ? "bg-raised ring-1 ring-border-strong" : "bg-transparent",
      )}
    >
      <span
        className={cn(
          "font-mono text-sm tabular-nums",
          selected ? "text-accent" : "text-subtle",
        )}
      >{displayRank}</span>
      <div className="flex min-w-0 items-center gap-3">
        <Headshot src={player.headshot} name={player.name} team={player.team} size="sm" />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium tracking-tight text-fg">{player.name}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted">
            <span>
              {player.pos} · {player.team ?? "FA"}
            </span>
            <span className="text-subtle">WOPR {fmtNum(player.wopr, 2)}</span>
            <span className="hidden text-subtle sm:inline">TPRR {fmtNum(player.tprr, 2)}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-sm tabular-nums text-accent">{fmtNum(score, 0)}</div>
        <div className="font-mono text-[11px] tabular-nums text-subtle">
          ADP {fmtAdp(player.adp_ppr)}
        </div>
      </div>
    </button>
  );
}
