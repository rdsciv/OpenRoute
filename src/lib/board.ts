import raw from "@/data/board.json";

export type Stickiness = "High" | "Medium-high" | "Medium" | "Low-medium" | "Low";

export type MetricDef = {
  id: string;
  rank: number;
  label: string;
  short: string;
  stickiness: Stickiness;
  why: string;
  source: string;
};

export type PlayerPcts = {
  target_share: number | null;
  air_yards_share: number | null;
  wopr: number | null;
  tprr: number | null;
  routes_tprr: number | null;
  fd_per_route: number | null;
  yprr: number | null;
  deep: number | null;
  output: number | null;
};

export type Player = {
  name: string;
  pos: "WR" | "TE";
  team: string | null;
  team_2025: string | null;
  age: number | null;
  years_exp: number | null;
  college: string | null;
  headshot: string | null;
  sleeper_id: string | null;
  ss_url: string | null;
  routes: number | null;
  receptions: number | null;
  rec_yards: number | null;
  tds: number | null;
  yac: number | null;
  adot: number | null;
  catch_pct: number | null;
  epa: number | null;
  tprr: number | null;
  yprr: number | null;
  targets: number | null;
  target_share: number | null;
  air_yards: number | null;
  air_yards_share: number | null;
  wopr: number | null;
  first_downs: number | null;
  fd_per_route: number | null;
  rec_20: number | null;
  ppr_2025: number | null;
  ppr_per_game: number | null;
  rec_epa: number | null;
  separation: number | null;
  yacoe: number | null;
  games: number | null;
  adp_ppr: number | null;
  proj_ppr: number | null;
  stickiness: number | null;
  breakout: number | null;
  value_score: number | null;
  breakout_rank: number;
  stickiness_rank: number;
  value_rank: number;
  breakout_eligible: boolean;
  tags: string[];
  why: string;
  pcts: PlayerPcts;
  factors: {
    youth: number;
    opportunity: number;
    sample: number;
    elite_discount: number;
    adp_value: number;
    td_gap: number;
    role_expansion: number;
    vacated_pos: number;
  };
};

export type Rookie = {
  id: string;
  name: string;
  pos: string;
  team: string | null;
  college: string | null;
  age: number | null;
  adp_ppr: number;
  proj_ppr: number | null;
  headshot: string | null;
  note: string;
};

export type BoardData = {
  meta: {
    title: string;
    season: number;
    sampleSeason: number;
    updated: string;
    sources: string[];
    note: string;
    minRoutes: number;
    universeRoutes: number;
    nPlayers: number;
  };
  metrics: MetricDef[];
  players: Player[];
  rookies: Rookie[];
};

export const board = raw as BoardData;

export type BoardMode = "breakout" | "value" | "usage";
export type PosFilter = "ALL" | "WR" | "TE";

export function playerId(p: Player) {
  return p.sleeper_id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function rankOf(p: Player, mode: BoardMode) {
  if (mode === "usage") return p.stickiness_rank;
  if (mode === "value") return p.value_rank;
  return p.breakout_rank;
}

export function scoreOf(p: Player, mode: BoardMode) {
  if (mode === "usage") return p.stickiness;
  if (mode === "value") return p.value_score;
  return p.breakout;
}

export function sortPlayers(list: Player[], mode: BoardMode) {
  return [...list].sort((a, b) => rankOf(a, mode) - rankOf(b, mode));
}

export function fmtPct(x: number | null | undefined, digits = 1) {
  if (x == null) return "—";
  return `${(x * 100).toFixed(digits)}%`;
}

export function fmtNum(x: number | null | undefined, digits = 0) {
  if (x == null) return "—";
  return x.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function fmtAdp(x: number | null | undefined) {
  if (x == null) return "—";
  return x.toFixed(1);
}

export function yearLabel(yearsExp: number | null) {
  if (yearsExp == null) return null;
  return `Year ${yearsExp + 1}`;
}
