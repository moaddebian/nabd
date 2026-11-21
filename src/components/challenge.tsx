"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Team } from "@/lib/data";
export function Challenge({
  teams,
  total,
  goal,
  campaign,
  demo,
}: {
  teams: Team[];
  total: number;
  goal: number;
  campaign: string;
  demo: boolean;
}) {
  const [institution, setInstitution] = useState("");
  const reduce = useReducedMotion();
  const institutions = [
    ...new Set(teams.map((t) => t.institution).filter(Boolean)),
  ];
  const filtered = teams.filter(
    (t) => !institution || t.institution === institution,
  );
  const target = goal > 0 ? goal : Math.max(total, 1);
  return (
    <>
      <div className="live-label">
        <span className="status-dot demo-dot" />
        {demo ? "Données de démonstration" : "Classement des dons confirmés"}
      </div>
      {institutions.length > 1 && (
        <div className="filters">
          <label className="field">
            Établissement
            <select
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            >
              <option value="">Tous les établissements</option>
              {institutions.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className="panel">
        <div className="progress-label">
          <strong>{campaign || "Un objectif, toutes les équipes."}</strong>
          <span>
            {total}
            {goal > 0 ? ` / ${goal}` : ""} dons
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Objectif collectif"
          aria-valuenow={total}
          aria-valuemin={0}
          aria-valuemax={Math.max(target, total)}
        >
          <div
            className="progress-fill"
            style={{ width: Math.min(100, (total / target) * 100) + "%" }}
          />
        </div>
      </div>
      <div className="podium">
        {filtered.slice(0, 3).map((t, i) => (
          <article className="podium-card" key={t.id}>
            <span className="pill">
              {i === 0 ? "PREMIÈRE PULSATION" : `TOP ${i + 1}`}
            </span>
            <span className={"team-avatar color-" + i}>
              {t.name.slice(0, 2).toUpperCase()}
            </span>
            <h3>{t.name}</h3>
            <p>{t.institution}</p>
            <strong>{t.donations}</strong>
            <small>dons confirmés</small>
            <Link href="/donner" className="btn btn-outline">
              Rejoindre l’équipe
            </Link>
          </article>
        ))}
      </div>
      <div className="team-list">
        {filtered.map((t, i) => (
          <motion.article
            layout={!reduce}
            className="panel team-detail"
            id={t.id}
            key={t.id}
          >
            <div className="ranking-row">
              <span className="rank-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={"team-avatar color-" + (i % 3)}>
                {t.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <strong>{t.name}</strong>
                <small>
                  {[t.institution, t.participants ? `${t.participants} membres` : ""]
                    .filter(Boolean)
                    .join(" · ")}
                </small>
              </div>
              <span className="team-score">
                {t.donations}
                <small>dons confirmés</small>
              </span>
            </div>
            {t.description && <p>{t.description}</p>}
            <Link href="/donner" className="btn btn-ghost">
              Rejoindre cette équipe →
            </Link>
          </motion.article>
        ))}
      </div>
      {!filtered.length && (
        <div className="panel">
          <h2>Le mouvement commence ici.</h2>
          <p>
            Aucune équipe pour le moment. Inscrivez-vous et indiquez votre
            classe, votre club ou votre association.
          </p>
        </div>
      )}
      <p className="notice">
        Le challenge valorise la mobilisation, jamais la fréquence des dons. Le
        centre reste seul habilité à vérifier votre éligibilité.
      </p>
    </>
  );
}
