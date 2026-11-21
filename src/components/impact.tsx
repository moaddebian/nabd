import { Droplet, Users, Flag, MapPin } from "lucide-react";
import type { Impact } from "@/lib/data";
import { AnimatedNumber } from "./animated-number";
export function ImpactCards({
  data,
  demo,
  error,
}: {
  data: Impact;
  demo: boolean;
  error: string | null;
}) {
  const cards = [
    [Users, data.registrations, "Inscriptions"],
    [Droplet, data.donations, "Dons confirmés"],
    [Flag, data.teams, "Équipes mobilisées"],
    [MapPin, data.cities, "Villes représentées"],
  ] as const;
  return (
    <div>
      <div className="live-label">
        <span className={demo ? "status-dot demo-dot" : "status-dot"} />
        {demo
          ? "Données de démonstration"
          : "Chiffres NABD · mis à jour toutes les 5 minutes"}
      </div>
      {error ? (
        <p role="alert" className="notice">
          {error}
        </p>
      ) : (
        <div className="stats-grid">
          {cards.map(([Icon, value, label]) => (
            <div className="stat" key={label}>
              <Icon size={20} />
              <AnimatedNumber value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
