import { publicData } from "@/lib/data";
import { PageHeading } from "@/components/page-heading";
import { Challenge } from "@/components/challenge";
export const revalidate = 300;
export const metadata = { title: "Challenge NABD" };
export default async function Page() {
  const d = await publicData();
  return (
    <div className="container">
      <PageHeading
        label="LE CHALLENGE NABD"
        title="Ensemble, on fait battre plus fort."
      >
        Des clubs, des classes, des amis. Une communauté qui se mobilise, à son
        rythme et sans pression.
      </PageHeading>
      <div className="page-content">
        {d.error ? (
          <p role="alert" className="notice">
            {d.error}
          </p>
        ) : (
          <Challenge
            teams={d.teams}
            total={d.impact.donations}
            goal={d.impact.goal}
            campaign={d.impact.campaign}
            demo={d.demo}
          />
        )}
      </div>
    </div>
  );
}
