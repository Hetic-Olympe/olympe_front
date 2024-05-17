import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, Divider } from "@/components/ui/Card/Card";

export default function UserDashboard() {
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
                            content card
                        </Card>
                    </GridItem>
                </Grid>
            </PageTemplate>
        </>
    )
}