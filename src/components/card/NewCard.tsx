import { Card } from "@mantine/core";
import styles from "~/components/card/WilderKindCard.module.css";

export default function NewCard(props) {
  return (
    <Card
      className={styles["card-front"]}
      key={props.id}
      shadow="md"
      radius="lg"
      withBorder
    >
      NewCard.tsx
    </Card>
  );
}
