import Link from "next/link";
export default function Page() {
  return (
    <div className="container section">
      <h1>Ce chemin s’arrête ici.</h1>
      <p>Reprenons le fil de la solidarité.</p>
      <Link href="/" className="btn btn-primary">
        Retour à l’accueil
      </Link>
    </div>
  );
}
