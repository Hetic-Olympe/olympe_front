import Header from "@/components/sections/Header/Header";
import PageTemplate from "@/components/sections/PageTeample/PageTemplate";
import { Grid, GridItem } from "@/components/ui/Grid/Grid";
import { Card, Divider } from "@/components/ui/Card/Card";

export default function AdminDashboard() {
    return (
        <>
            <Header title="Manage all users" subtitle="Handle users information and moderation" />
            <PageTemplate>
                <Grid>
                    <GridItem columnSpan={6} rowSpan={3}>
                        <Card title="Users" link="/example" minHeight={800}>
                            content card
                        </Card>
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <Card title="Other title" padding={0}>
                            content card
                            <Divider />
                            blabla
                        </Card>
                    </GridItem>
                    <GridItem columnSpan={6}>
                        <Card title="Super title">
                            content card
                        </Card>
                    </GridItem>
                </Grid>
            </PageTemplate>
        </>
    )
}