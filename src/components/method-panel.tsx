import { board } from "@/lib/board";

export function MethodPanel() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-muted">
      <p className="text-pretty text-fg">
        Breakouts are ranked on 2025 SumerSports usage, weighted by how well each
        metric predicts next-year PPR. Volume sticks. Touchdowns and YAC do not.
      </p>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[36rem] text-left text-xs">
          <thead className="bg-raised font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            <tr>
              <th className="px-3 py-2 font-medium">Rk</th>
              <th className="px-3 py-2 font-medium">Metric</th>
              <th className="px-3 py-2 font-medium">Why it matters</th>
              <th className="px-3 py-2 font-medium">Stickiness</th>
            </tr>
          </thead>
          <tbody>
            {board.metrics.map((m) => (
              <tr key={m.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono tabular-nums text-subtle">{m.rank}</td>
                <td className="px-3 py-2 text-fg">{m.label}</td>
                <td className="px-3 py-2 text-pretty">{m.why}</td>
                <td className="px-3 py-2 font-mono text-accent">{m.stickiness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>{board.meta.note}</p>
      <ul className="space-y-1.5 text-xs">
        {board.meta.sources.map((s) => (
          <li key={s} className="text-pretty">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
