import { useState } from "react";
import { cn } from "@/lib/utils";
import { teamColor } from "@/lib/teams";

export function Headshot({
  src,
  name,
  team,
  size = "md",
}: {
  src: string | null;
  name: string;
  team?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const dim = size === "lg" ? "size-16" : size === "sm" ? "size-9" : "size-11";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-raised",
        dim,
      )}
      style={{ boxShadow: `inset 0 0 0 1.5px ${teamColor(team)}` }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt=""
          className="size-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex size-full items-center justify-center font-mono text-[10px] tracking-wide text-muted">
          {initials}
        </span>
      )}
    </div>
  );
}
