"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="container section">
      <h1>Une petite pause.</h1>
      <p>
        Cette page n’a pas pu se charger. Vos données enregistrées sont
        conservées.
      </p>
      <button className="btn btn-primary" onClick={reset}>
        Réessayer
      </button>
    </div>
  );
}
