import { publicData } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { ImpactCards } from "@/components/impact";
import Link from "next/link";
export const revalidate = 300;
export const metadata = { title: "Notre impact" };
export default async function Page() {
  const d = await publicData();
  return (
    <div className="container">
      <PageHeading
        label="CHAQUE GESTE A SA PLACE"
        title="L’impact se construit ensemble."
      >
        Des inscriptions, des dons confirmés par les centres, des équipes
        mobilisées. Et une même envie de faire avancer la solidarité.
      </PageHeading>
      <div className="page-content">
        <div className="panel">
          <ImpactCards data={d.impact} demo={d.demo} error={d.error} />
        </div>
        <div className="panel">
          <h2>Ce que nous comptons.</h2>
          <p>
            Une inscription est une intention. Seul un don confirmé par le
            centre de transfusion fait progresser le compteur des dons.
          </p>
          <p>
            Les chiffres publiés sont des totaux : aucun nom ni aucune
            information personnelle de donneur n’est affiché sur NABD.
          </p>
          <Link href="/challenge" className="btn btn-outline">
            Découvrir les équipes →
          </Link>
        </div>
      </div>
    </div>
  );
}
