import { Link } from "react-router-dom";

import { Card, Image, Title } from "@mantine/core";
import { Result } from "~/models/iNatTaxaResponseType.ts";

export default function GenericCard({ record }: { record: Result }) {
  return (
    <Card key={record.id}>
      <Title size="h4">{record.preferred_common_name}</Title>
      <Title size="h5">{record.name}</Title>
      <Title size="h6">GenericCard</Title>
      <p>ID: {record.id}</p>
      {record.wikipedia_url && (
        <Link to={record.wikipedia_url}>Wikipedia link</Link>
      )}

      {record.default_photo && (
        <Link to={record.default_photo?.medium_url}>
          <Image
            src={record.default_photo?.url}
            // radius='lg'
            // w={200}
          />
        </Link>
      )}

      {/* <Button onClick={() => searchCards(record.id)}>Search cards</Button> */}

      {/*{correspondingCard && (*/}
      {/*    <Link*/}
      {/*        to={"/cards/" + correspondingCard.id}*/}
      {/*        key={correspondingCard.id}*/}
      {/*    >*/}
      {/*        in WilderKind index: {correspondingCard.nickname}*/}
      {/*    </Link>*/}
      {/*)}*/}
    </Card>
  );
}
