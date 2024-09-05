import { AspectRatio, Skeleton, Title, Card, Text } from "@mantine/core";

export function WilderKindCard_Skeleton() {
  return (
    <>
      <Card
        shadow="md"
        // p='xl'
        radius="lg"
        withBorder
      >
        <Title order={4} size="h1">
          <Skeleton height={"10px"} width={"500px"} />
        </Title>

        <Card.Section>
          <AspectRatio ratio={1}>
            <Skeleton height={500} width={500}></Skeleton>
          </AspectRatio>
        </Card.Section>

        <Title lineClamp={1} order={2} size="h3"></Title>
        <Title lineClamp={1} order={3} size="h4"></Title>

        <Text></Text>
        <Text size="sm" mt={12}></Text>
        <Text size="sm" mt={12}></Text>

        <Card.Section></Card.Section>
      </Card>
    </>
  );
}
