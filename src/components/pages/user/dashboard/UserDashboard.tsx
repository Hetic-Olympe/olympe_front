import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import MedalProfile from "@/components/ui/MedalProfile/MedalProfile";
import athletesData from "../../../ui/MedalProfile/temp__athlete.json";
import { MedalsIcon, AthleteIcon } from "@/components/icons/icons";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, KPICard } from "@/components/ui/Card/Card";
import EventCalendar from "@/components/calendar/EventCalendar";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function UserDashboard() {
  const athletes = athletesData.athletes;
  return (
    <>
      <Header
        title="Dashboard of Paris 2024 live data"
        subtitle="Description for amazing dashboard in Paris 2024 with all KPI"
      />
      <PageTemplate>
        <Grid margin={"0px 0px 32px 0px"}>
          <GridItem columnSpan={3}>
            <KPICard
              title="Athletes"
              value={532}
              icon={<AthleteIcon color={"#23B2F5"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="Medals won"
              value={192}
              icon={<MedalsIcon color={"#23B2F5"} />}
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <KPICard
              title="Medals won"
              value={192}
              icon={<AthleteIcon color={"#23B2F5"} />}
            />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem columnSpan={6} rowSpan={4}>
            <Card title="Results" link="/statistics" minHeight={500}>
              content card
            </Card>
          </GridItem>
          <GridItem columnSpan={6}>
            <Card title="Today schedule" link="/calendar" padding={0}>
              <EventCalendar
                plugins={[timeGridPlugin, listPlugin]}
                headerToolbar={false}
                initialView="listDay"
                isFullCalendar={false}
                height={500}
              />
            </Card>
          </GridItem>
          <GridItem columnSpan={6}>
            <Card title="Top athletes" link="/athletes">
              <div className="flex gap-[2rem]">
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
