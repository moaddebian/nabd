import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HeartArt } from "@/components/brand";
import { Reveal } from "@/components/motion";
import { ImpactCards } from "@/components/impact";
import { publicData } from "@/lib/data";
export const revalidate = 300;
export default async function Home() {
  const data = await publicData();
  return (
    <>
      <section className="hero container">
        <Reveal className="hero-copy">
          <span className="eyebrow">
            <span /> LA GÉNÉRATION QUI DONNE
          </span>
          <h1>
            Un don.
            <br />
            Un battement.
            <br />
            <em>Une vie.</em>
          </h1>
          <p>
            On a tous le pouvoir de faire la différence.
            <br />
            Ensemble, faisons du don du sang un élan
            <br className="desktop-break" /> qui nous rassemble.
          </p>
          <div className="hero-buttons">
            <Link href="/donner" className="btn btn-primary">
              Je veux donner <ArrowUpRight size={19} />
            </Link>
            <Link href="/impact" className="text-link">
              Découvrir notre impact <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-reassurance">
            <ShieldCheck size={17} /> Un geste volontaire. Un accompagnement
            humain.
          </div>
        </Reveal>
        <Reveal className="hero-visual">
          <HeartArt />
        </Reveal>
      </section>
      <section className="impact-band">
        <div className="container">
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">L’IMPACT, C’EST NOUS.</span>
              <h2>
                De petits gestes.
                <br />
                Une grande force collective.
              </h2>
            </div>
            <Link href="/impact" className="text-link">
              Voir l’impact <ArrowUpRight size={18} />
            </Link>
          </div>
          <ImpactCards
            data={data.impact}
            demo={data.demo}
            error={data.error}
          />
        </div>
      </section>
      <section className="container section">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                LE PREMIER PAS EST PLUS SIMPLE QU’ON NE LE PENSE
              </span>
              <h2>Du cœur à l’action.</h2>
            </div>
            <p>
              Vous n’avez pas à tout savoir.
              <br />
              On vous accompagne, étape par étape.
            </p>
          </div>
          <div className="steps">
            {[
              [
                Heart,
                "01",
                "Je m’inscris",
                "Quelques questions, deux minutes. Et l’envie d’aider.",
              ],
              [
                CalendarDays,
                "02",
                "On me recontacte",
                "NABD me met en relation avec un centre de transfusion.",
              ],
              [
                ShieldCheck,
                "03",
                "Je rencontre le centre",
                "L’équipe vérifie mon éligibilité et m’accompagne.",
              ],
              [
                Sparkles,
                "04",
                "Mon geste compte",
                "Une fois confirmé, mon don rejoint l’impact collectif.",
              ],
            ].map(([Icon, n, title, body]) => {
              const I = Icon as typeof Heart;
              return (
                <article key={String(n)} className="step">
                  <div className="step-top">
                    <I size={23} />
                    <span>{String(n)}</span>
                  </div>
                  <h3>{String(title)}</h3>
                  <p>{String(body)}</p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </section>
      <section className="container challenge-feature">
        <div className="challenge-copy">
          <span className="eyebrow">CHALLENGE NABD</span>
          <h2>
            Seul, on donne.
            <br />
            Ensemble, on inspire.
          </h2>
          <p>
            Votre classe, votre club, vos amis. Rassemblez votre équipe et
            faites grandir un mouvement qui compte.
          </p>
          <ul className="check-list">
            <li>
              <Check size={17} /> Un objectif partagé, sans pression
            </li>
            <li>
              <Check size={17} /> Chaque don confirmé valorisé
            </li>
            <li>
              <Check size={17} /> La solidarité avant la compétition
            </li>
          </ul>
          <Link href="/challenge" className="btn btn-primary">
            Découvrir les équipes <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="ranking-preview">
          <div className="ranking-header">
            <span>LES ÉQUIPES QUI FONT BATTRE NABD</span>
            <span>↗</span>
          </div>
          <small>
            {data.demo
              ? "Données de démonstration"
              : "Classement des dons confirmés"}
          </small>
          {data.teams.slice(0, 3).map((t, i) => (
            <Link
              href={"/challenge#" + t.id}
              key={t.id}
              className="ranking-row"
            >
              <span className="rank-number">0{i + 1}</span>
              <span className={"team-avatar color-" + i}>
                {t.name
                  .split(" ")
                  .map((v) => v[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <strong>{t.name}</strong>
                <small>{t.institution}</small>
              </div>
              <span className="team-score">
                {t.donations}
                <small>dons</small>
              </span>
            </Link>
          ))}
          {!data.teams.length && (
            <p>Le prochain mouvement commence avec votre équipe.</p>
          )}
          <div className="ranking-foot">
            <Heart size={16} /> Chaque équipe apporte sa pulsation.
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ET SI ON EN PARLAIT ?</span>
            <h2>
              Moins d’idées reçues.
              <br />
              Plus de confiance.
            </h2>
          </div>
          <Link href="/comprendre" className="text-link">
            Comprendre le don <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="myth-grid">
          {[
            [
              "01",
              "« Je dois venir à jeun. »",
              "Prenez le temps de bien vous préparer.",
            ],
            [
              "02",
              "« Je peux donner dès que je veux. »",
              "Votre santé reste la priorité.",
            ],
            [
              "03",
              "« Je dois être parfaitement à l’aise. »",
              "Vos questions ont toute leur place.",
            ],
          ].map(([n, title, body]) => (
            <Link href={"/comprendre#mythe-" + n} className="myth-card" key={n}>
              <span className="pill">MYTHE OU RÉALITÉ ?</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="text-link">
                Découvrir la réponse <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container cta">
        <div className="cta-pulse">♡</div>
        <span className="eyebrow">LE PROCHAIN BATTEMENT, C’EST VOUS.</span>
        <h2>Faisons circuler la vie.</h2>
        <p>Un premier pas pour vous. Un nouvel espoir pour quelqu’un.</p>
        <Link href="/donner" className="btn btn-white">
          Je rejoins le mouvement <ArrowUpRight size={18} />
        </Link>
        <small>
          Vous ne pouvez pas donner ? Mobiliser votre entourage compte aussi.
        </small>
      </section>
    </>
  );
}
