import { parseImpact, parseTeams, type Impact, type Team } from "./sheets";
export type { Impact, Team } from "./sheets";

/** Délai de rafraîchissement des chiffres issus de Google Sheets (secondes). */
export const REFRESH_SECONDS = 300;

export const DEFAULT_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScmix-1kYJRR8u1BS7eKiq_lGl-Uq5MbZ8DHczJldzQINth6A/viewform";

export function formUrls() {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || DEFAULT_FORM_URL;
  const base = raw.split("?")[0];
  return { open: base, embed: base + "?embedded=true" };
}

const demoTeams: Team[] = [
  {
    id: "demo1",
    name: "Les Cœurs Unis",
    institution: "Campus Atlas",
    description: "Ensemble, faisons battre la solidarité.",
    donations: 86,
    participants: 104,
  },
  {
    id: "demo2",
    name: "Pulse Club",
    institution: "Campus Horizon",
    description: "Une génération qui se mobilise.",
    donations: 64,
    participants: 82,
  },
  {
    id: "demo3",
    name: "Goutte à Goutte",
    institution: "Campus Atlas",
    description: "Chaque geste fait la différence.",
    donations: 52,
    participants: 67,
  },
  {
    id: "demo4",
    name: "Les Engagés",
    institution: "Campus Horizon",
    description: "Un petit geste, un élan collectif.",
    donations: 38,
    participants: 45,
  },
];

const demoImpact: Impact = {
  registrations: 312,
  donations: 240,
  teams: 4,
  cities: 9,
  goal: 500,
  campaign: "Campus solidaires · Démonstration",
};

async function fetchCsv(url: string) {
  const response = await fetch(url, { next: { revalidate: REFRESH_SECONDS } });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const text = await response.text();
  if (text.trimStart().startsWith("<"))
    throw new Error("La feuille n’est pas publiée au format CSV.");
  return text;
}

export type PublicData = {
  demo: boolean;
  error: string | null;
  impact: Impact;
  teams: Team[];
};

/**
 * Chiffres publics : lus depuis les onglets Google Sheets publiés en CSV
 * (GOOGLE_SHEET_IMPACT_CSV_URL, GOOGLE_SHEET_TEAMS_CSV_URL).
 * Sans configuration, des données de démonstration clairement signalées.
 */
export async function publicData(): Promise<PublicData> {
  const impactUrl = process.env.GOOGLE_SHEET_IMPACT_CSV_URL;
  const teamsUrl = process.env.GOOGLE_SHEET_TEAMS_CSV_URL;
  if (!impactUrl && !teamsUrl)
    return { demo: true, error: null, impact: demoImpact, teams: demoTeams };
  try {
    const [impactCsv, teamsCsv] = await Promise.all([
      impactUrl ? fetchCsv(impactUrl) : Promise.resolve(""),
      teamsUrl ? fetchCsv(teamsUrl) : Promise.resolve(""),
    ]);
    const teams = parseTeams(teamsCsv);
    const impact = parseImpact(impactCsv);
    if (!impact.teams) impact.teams = teams.length;
    if (!impact.donations)
      impact.donations = teams.reduce((s, t) => s + t.donations, 0);
    return { demo: false, error: null, impact, teams };
  } catch (e) {
    console.error("Google Sheets indisponible :", e);
    return {
      demo: false,
      error:
        "Les chiffres sont momentanément indisponibles. Réessayez dans un instant.",
      impact: { ...demoImpact, registrations: 0, donations: 0, teams: 0, cities: 0, campaign: "" },
      teams: [],
    };
  }
}
