import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formUrls } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
export const metadata = { title: "Je donne mon sang" };
export default function Page() {
  const form = formUrls();
  return (
    <div className="container narrow">
      <PageHeading label="JE DONNE MON SANG" title="Un petit pas pour vous.">
        Quelques questions, deux minutes. Nous vous mettons ensuite en relation
        avec un centre de transfusion.
      </PageHeading>
      <div className="page-content">
        <div className="panel">
          <p className="notice">
            L’inscription ne garantit pas l’éligibilité au don. L’équipe du
            centre l’évaluera avec vous sur place.{" "}
            <Link href="/confidentialite" className="source">
              Vos données
            </Link>
          </p>
          <iframe
            className="form-embed"
            src={form.embed}
            title="Formulaire d’inscription NABD"
            loading="lazy"
          >
            Chargement du formulaire…
          </iframe>
          <div className="form-actions">
            <a
              href={form.open}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Ouvrir le formulaire dans un nouvel onglet{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
