import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import MedalProfile from "@/components/ui/MedalProfile/MedalProfile";
import athletesData from "../../../ui/MedalProfile/temp__athlete.json";

export default function UserDashboard() {
  const athletes = athletesData.athletes;

  return (
    <>
      <Header
        title="Dashboard of Paris 2024 live data"
        subtitle="Description for amazing dashboard in Paris 2024 with all KPI"
      />
      <PageTemplate>
        <h1>Page content</h1>
        <div className="flex gap-[2rem]">
          <MedalProfile type={1} athlete={athletes[0]} />
          <MedalProfile type={2} athlete={athletes[1]} />
          <MedalProfile type={3} athlete={athletes[2]} />
        </div>
      </PageTemplate>
    </>
  );
}
