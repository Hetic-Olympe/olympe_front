import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Card, Divider } from "@/components/ui/Card/Card";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
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
        <Grid>
          <GridItem columnSpan={6} rowSpan={4}>
            <Card title="Results" link="/statistics" minHeight={500}>
              content card
            </Card>
          </GridItem>
          <GridItem columnSpan={6}>
            <Card title="Today schedule" link="/calendar">
              content card
              <Divider />
              blabla
            </Card>
          </GridItem>
          <GridItem columnSpan={6}>
            <Card title="Top athletes" link="/athletes">
              <div className="flex justify-space-between gap-[2rem]">
                <MedalProfile type={1} athlete={athletes[0]} />
                <MedalProfile type={2} athlete={athletes[1]} />
                <MedalProfile type={3} athlete={athletes[2]} />
              </div>
            </Card>
          </GridItem>
        </Grid>
      </PageTemplate>
    </>
  );
}
