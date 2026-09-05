export const TEAM_META: Record<string, { city: string; name: string; color: string }> = {
  ARI: { city: "Arizona", name: "Cardinals", color: "#97233f" },
  ATL: { city: "Atlanta", name: "Falcons", color: "#a71930" },
  BAL: { city: "Baltimore", name: "Ravens", color: "#241773" },
  BUF: { city: "Buffalo", name: "Bills", color: "#00338d" },
  CAR: { city: "Carolina", name: "Panthers", color: "#0085ca" },
  CHI: { city: "Chicago", name: "Bears", color: "#0b162a" },
  CIN: { city: "Cincinnati", name: "Bengals", color: "#fb4f14" },
  CLE: { city: "Cleveland", name: "Browns", color: "#311d00" },
  DAL: { city: "Dallas", name: "Cowboys", color: "#041e42" },
  DEN: { city: "Denver", name: "Broncos", color: "#fb4f14" },
  DET: { city: "Detroit", name: "Lions", color: "#0076b6" },
  GB: { city: "Green Bay", name: "Packers", color: "#203731" },
  HOU: { city: "Houston", name: "Texans", color: "#03202f" },
  IND: { city: "Indianapolis", name: "Colts", color: "#002c5f" },
  JAX: { city: "Jacksonville", name: "Jaguars", color: "#006778" },
  KC: { city: "Kansas City", name: "Chiefs", color: "#e31837" },
  LAC: { city: "Los Angeles", name: "Chargers", color: "#0080c6" },
  LAR: { city: "Los Angeles", name: "Rams", color: "#003594" },
  LV: { city: "Las Vegas", name: "Raiders", color: "#a5acaf" },
  MIA: { city: "Miami", name: "Dolphins", color: "#008e97" },
  MIN: { city: "Minnesota", name: "Vikings", color: "#4f2683" },
  NE: { city: "New England", name: "Patriots", color: "#002244" },
  NO: { city: "New Orleans", name: "Saints", color: "#d3bc8d" },
  NYG: { city: "New York", name: "Giants", color: "#0b2265" },
  NYJ: { city: "New York", name: "Jets", color: "#125740" },
  PHI: { city: "Philadelphia", name: "Eagles", color: "#004c54" },
  PIT: { city: "Pittsburgh", name: "Steelers", color: "#ffb612" },
  SEA: { city: "Seattle", name: "Seahawks", color: "#002244" },
  SF: { city: "San Francisco", name: "49ers", color: "#aa0000" },
  TB: { city: "Tampa Bay", name: "Buccaneers", color: "#d50a0a" },
  TEN: { city: "Tennessee", name: "Titans", color: "#0c2340" },
  WAS: { city: "Washington", name: "Commanders", color: "#5a1414" },
};

export function teamLabel(abbr: string | null | undefined) {
  if (!abbr) return "FA";
  const t = TEAM_META[abbr];
  return t ? t.name : abbr;
}

export function teamColor(abbr: string | null | undefined) {
  if (!abbr) return "#6b7066";
  return TEAM_META[abbr]?.color ?? "#6b7066";
}
