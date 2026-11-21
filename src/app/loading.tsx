export default function Loading() {
  return (
    <div className="container section" aria-busy="true" aria-label="Chargement">
      <div className="skeleton" />
      <p style={{ marginTop: 20 }}>Un instant, NABD se prépare…</p>
    </div>
  );
}
