import { Link } from "react-router-dom";

import { Card, Image, Title } from "@mantine/core";
import { iNatTaxonRecord } from "~/models/iNatTaxaResponseType.ts";

export default function GenericCard({ taxon }: { taxon: iNatTaxonRecord }) {
  return (
    <Card key={taxon.id}>
      <Title size="h4">{taxon.preferred_common_name}</Title>
      <Title size="h5">{taxon.name}</Title>
      <Title size="h6">GenericCard</Title>
      <p>ID: {taxon.id}</p>
      {taxon.wikipedia_url && (
        <Link to={taxon.wikipedia_url}>Wikipedia link</Link>
      )}

      {taxon.default_photo && (
        <Link to={taxon.default_photo?.medium_url}>
          <Image
            src={taxon.default_photo?.url}
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
