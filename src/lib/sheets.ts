// Lecture des onglets Google Sheets publiés au format CSV.
// Aucune dépendance : fonctions pures, testées dans tests/sheets.test.ts.

export type Team = {
  id: string;
  name: string;
  institution: string;
  description: string;
  participants: number;
  donations: number;
};

export type Impact = {
  registrations: number;
  donations: number;
  teams: number;
  cities: number;
  goal: number;
  campaign: string;
};

/** Parse un CSV (RFC 4180 : guillemets, virgules et retours à la ligne échappés). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && src[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

/** "Dons confirmés" -> "dons_confirmes" */
export function normalizeKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

/** "1 234" / "1 234,0" / "" -> nombre entier positif (0 si invalide). */
export function toCount(value: string | undefined): number {
  if (!value) return 0;
  const n = Number(value.replace(/[\s\u00a0\u202f]/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
}

const IMPACT_KEYS: Record<string, keyof Impact> = {
  inscriptions: "registrations",
  inscrits: "registrations",
  dons_confirmes: "donations",
  dons: "donations",
  equipes: "teams",
  villes: "cities",
  objectif: "goal",
  campagne: "campaign",
};

/** Onglet « Impact » : deux colonnes, indicateur | valeur. */
export function parseImpact(csv: string): Impact {
  const impact: Impact = {
    registrations: 0,
    donations: 0,
    teams: 0,
    cities: 0,
    goal: 0,
    campaign: "",
  };
  for (const [key, value = ""] of parseCsv(csv)) {
    const field = IMPACT_KEYS[normalizeKey(key ?? "")];
    if (!field) continue;
    if (field === "campaign") impact.campaign = value.trim();
    else impact[field] = toCount(value);
  }
  return impact;
}

/** Onglet « Equipes » : equipe | etablissement | description | membres | dons. */
export function parseTeams(csv: string): Team[] {
  const [header, ...rows] = parseCsv(csv);
  if (!header) return [];
  const col = (...names: string[]) =>
    header.findIndex((h) => names.includes(normalizeKey(h)));
  const name = col("equipe", "nom", "team");
  const institution = col("etablissement", "institution", "ecole");
  const description = col("description");
  const participants = col("membres", "inscrits", "participants");
  const donations = col("dons", "dons_confirmes");
  if (name < 0) return [];
  const seen = new Set<string>();
  return rows
    .map((r) => {
      const teamName = (r[name] ?? "").trim();
      let id = normalizeKey(teamName) || "equipe";
      while (seen.has(id)) id += "-2";
      seen.add(id);
      return {
        id,
        name: teamName,
        institution: institution >= 0 ? (r[institution] ?? "").trim() : "",
        description: description >= 0 ? (r[description] ?? "").trim() : "",
        participants: participants >= 0 ? toCount(r[participants]) : 0,
        donations: donations >= 0 ? toCount(r[donations]) : 0,
      };
    })
    .filter((t) => t.name)
    .sort((a, b) => b.donations - a.donations || b.participants - a.participants);
}
