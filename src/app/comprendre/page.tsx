import { PageHeading } from "@/components/page-heading";
import {
  Moon,
  Droplets,
  Apple,
  HeartHandshake,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
const source =
  "https://www.ameli.fr/assure/sante/themes/don-de-sang/don-de-sang-total";
export const metadata = { title: "Comprendre le don" };
export default function Page() {
  return (
    <div className="container">
      <PageHeading
        label="S’INFORMER, C’EST DÉJÀ S’ENGAGER"
        title="Un peu de savoir. Beaucoup de confiance."
      >
        Des repères pour préparer votre échange avec le centre. Les conditions
        applicables au Maroc doivent être confirmées auprès de l’équipe qui vous
        accueille.
      </PageHeading>
      <div className="page-content">
        <div className="panel accordion">
          <h2>Mythes vs faits.</h2>
          {[
            [
              "01",
              "« Je dois venir à jeun. »",
              "Faux. Les recommandations générales de l’Assurance Maladie invitent à avoir mangé et à bien s’hydrater avant le don. Suivez les consignes spécifiques de votre centre.",
            ],
            [
              "02",
              "« Je peux donner dès que je veux. »",
              "Faux. La fréquence et l’éligibilité dépendent notamment du type de don et des règles applicables. Un délai écoulé ne suffit pas à garantir votre aptitude : le centre l’évalue à chaque don.",
            ],
            [
              "03",
              "« Je dois être parfaitement à l’aise. »",
              "Vous pouvez poser vos questions et exprimer vos appréhensions pendant l’entretien préalable. La décision de donner reste volontaire.",
            ],
            [
              "04",
              "« Le rendez-vous se résume au prélèvement. »",
              "Non. Il comprend aussi l’accueil, l’entretien préalable et un temps de repos après le prélèvement. Demandez au centre la durée à prévoir selon le type de don.",
            ],
          ].map(([id, title, body]) => (
            <details id={"mythe-" + id} key={id}>
              <summary>{title}</summary>
              <p>{body}</p>
              <a
                className="source"
                href={source}
                target="_blank"
                rel="noreferrer"
              >
                Source : Assurance Maladie · Don de sang total ↗
              </a>
            </details>
          ))}
        </div>
        <div className="section-heading" style={{ marginTop: 50 }}>
          <div>
            <span className="eyebrow">AVANT LE RENDEZ-VOUS</span>
            <h2>Prenez aussi soin de vous.</h2>
          </div>
        </div>
        <div className="tips">
          {[
            [
              Droplets,
              "S’hydrater",
              "Pensez à boire de l’eau avant votre venue, selon les conseils de votre centre.",
            ],
            [
              Apple,
              "Manger normalement",
              "Ne venez pas à jeun. Privilégiez un repas équilibré et suivez les consignes reçues.",
            ],
            [
              Moon,
              "Arriver reposé",
              "Préparez votre venue dans de bonnes conditions. En cas de fatigue ou de doute, parlez-en au centre.",
            ],
            [
              MessageCircle,
              "Exprimer ses questions",
              "Une inquiétude, une appréhension ? Dites-le à l’équipe avant de commencer.",
            ],
            [
              HeartHandshake,
              "Respecter son rythme",
              "Vous pouvez aussi participer en mobilisant votre entourage. Il n’y a aucune obligation de donner.",
            ],
          ].map(([Icon, title, body]) => {
            const I = Icon as typeof Moon;
            return (
              <article key={String(title)}>
                <I size={25} />
                <h3>{String(title)}</h3>
                <p>{String(body)}</p>
              </article>
            );
          })}
        </div>
        <a href={source} className="source" target="_blank" rel="noreferrer">
          Consulter les recommandations générales de l’Assurance Maladie ↗
        </a>
        <p className="notice">
          NABD ne fournit ni diagnostic ni avis d’éligibilité. Les
          recommandations étrangères citées sont informatives ; le centre
          applique les règles locales au donneur et au type de don.
        </p>
        <Link href="/donner" className="btn btn-primary">
          Je m’inscris →
        </Link>
      </div>
    </div>
  );
}
