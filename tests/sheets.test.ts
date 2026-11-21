import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseCsv,
  parseImpact,
  parseTeams,
  normalizeKey,
  toCount,
} from "../src/lib/sheets";

test("parseCsv handles quotes, commas, newlines and BOM", () => {
  const rows = parseCsv('\uFEFFa,b\r\n"x, y","he said ""hi"""\n"multi\nline",2\n\n');
  assert.deepEqual(rows, [
    ["a", "b"],
    ["x, y", 'he said "hi"'],
    ["multi\nline", "2"],
  ]);
});

test("normalizeKey strips accents and punctuation", () => {
  assert.equal(normalizeKey(" Dons confirmés "), "dons_confirmes");
  assert.equal(normalizeKey("Équipes"), "equipes");
});

test("toCount accepts French formatting and rejects garbage", () => {
  assert.equal(toCount("1 234"), 1234);
  assert.equal(toCount("12,0"), 12);
  assert.equal(toCount("abc"), 0);
  assert.equal(toCount("-5"), 0);
  assert.equal(toCount(undefined), 0);
});

test("parseImpact reads the indicateur | valeur tab", () => {
  const impact = parseImpact(
    "Indicateur,Valeur\nInscriptions,312\nDons confirmés,240\nÉquipes,4\nVilles,9\nObjectif,500\nCampagne,\"Campus solidaires, 2026\"\nInconnu,7\n",
  );
  assert.deepEqual(impact, {
    registrations: 312,
    donations: 240,
    teams: 4,
    cities: 9,
    goal: 500,
    campaign: "Campus solidaires, 2026",
  });
});

test("parseTeams maps columns by name, sorts and skips empty rows", () => {
  const teams = parseTeams(
    "Equipe,Etablissement,Description,Membres,Dons\nPulse Club,Campus B,Go,82,64\n,,,,\nLes Cœurs Unis,Campus A,,104,86\n",
  );
  assert.equal(teams.length, 2);
  assert.equal(teams[0].name, "Les Cœurs Unis");
  assert.equal(teams[0].donations, 86);
  assert.equal(teams[0].participants, 104);
  assert.equal(teams[1].id, "pulse_club");
});

test("parseTeams returns nothing without a team column", () => {
  assert.deepEqual(parseTeams("Foo,Bar\n1,2\n"), []);
  assert.deepEqual(parseTeams(""), []);
});
