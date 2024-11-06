import { Card, Grid, Title } from "@mantine/core";

export default function HomePage() {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={2}>Welcome</Title>
        {/*<Card></Card>*/}
      </Grid.Col>
    </Grid>
  );
}
