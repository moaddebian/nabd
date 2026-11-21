import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Confidentialité" };
export default function Page() {
  return (
    <div className="container narrow">
      <PageHeading
        label="VOS DONNÉES, AVEC RESPECT"
        title="La confiance fait partie du don."
      />
      <article className="panel prose page-content">
        <p className="notice">
          Politique de préparation au lancement. Le responsable du traitement,
          son contact, les durées de conservation et les formalités applicables
          doivent être définis avant toute collecte réelle.
        </p>
        <h2>Ce que NABD collecte</h2>
        <p>
          L’inscription se fait via un formulaire Google Forms : nom et prénom,
          âge, sexe, numéro de téléphone, adresse email (facultative), ville de
          résidence, groupe sanguin (ou « je ne le connais pas »), dons
          antérieurs, souhait d’être recontacté, remarques éventuelles et votre
          consentement.
        </p>
        <h2>Pourquoi et pour qui</h2>
        <p>
          Ces informations servent uniquement à vous recontacter et à vous
          mettre en relation avec une structure de transfusion sanguine. Les
          réponses sont enregistrées dans une feuille Google Sheets accessible
          aux seuls responsables de NABD. Le site public n’affiche que des
          totaux (inscriptions, dons confirmés, équipes, villes), jamais les
          noms ni les coordonnées des donneurs.
        </p>
        <h2>Vos choix</h2>
        <p>
          Vous pouvez retirer votre consentement et demander la correction ou
          la suppression de vos données en contactant l’équipe NABD. Le groupe
          sanguin est facultatif dans son principe : vous pouvez répondre « je
          ne connais pas mon groupe sanguin ».
        </p>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par Vercel. Les réponses au formulaire sont
          hébergées par Google (Google Forms et Google Sheets). Les régions
          d’hébergement, transferts éventuels et délais de conservation doivent
          être documentés par l’exploitant.
        </p>
        <h2>Avant une mise en service au Maroc</h2>
        <p>
          L’exploitant doit vérifier ses obligations auprès de la CNDP,
          notamment le cadre de la loi 09-08 et les formalités liées aux
          traitements ou transferts concernés.
        </p>
        <a
          className="source"
          href="https://www.cndp.ma/"
          target="_blank"
          rel="noreferrer"
        >
          CNDP — informations officielles ↗
        </a>
        <h2>Cookies</h2>
        <p>
          NABD ne dépose aucun cookie et n’intègre ni outil publicitaire ni
          traceur analytique. Le formulaire Google intégré à la page « Je
          donne » peut utiliser des cookies de Google, soumis à la politique de
          confidentialité de Google.
        </p>
      </article>
    </div>
  );
}
