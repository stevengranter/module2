import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import { Button, Flex, Grid, GridCol, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import GenericCard from "~/components/card/GenericCard.tsx";

import SortComponent from "components/ui/controls/SortComponent.tsx";
import { JSON_SERVER_URL } from "lib/constants.ts";
import { iNatTaxaResponseType } from "models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "models/WilderKindCardType.ts";

export default function SearchForm() {
  const form = useForm({ mode: "uncontrolled" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [matchingCards, setMatchingCards] = useState<WilderKindCardType[]>([]);
  const data = useLoaderData() as iNatTaxaResponseType;
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(values: typeof form.values) {
    setSearchParams(values);
  }

  useEffect(() => {
    // if (searchParams.size > 0) console.log(data.results);
    // console.log(searchParams.get('q'));
    if (data) searchCards(data);
  }, [searchParams, data]);

  async function searchCards(data: iNatTaxaResponseType) {
    if (!data.results) return;
    const { results } = data;
    const matchedCardsArray = [];

    for (const result of results) {
      try {
        // console.log(result);

        const matchingCardsResult = await fetch(
          `${JSON_SERVER_URL}/cards?taxon_id=${result.id}`,
        );

        if (!matchingCardsResult.ok) {
          setError("Network response was not okay");
        }

        const matchingCardsJSON = await matchingCardsResult.json();

        if (matchingCardsJSON.length > 0) {
          const match = matchingCardsJSON[0];
          const enrichedCard = { ...result, ...match };
          matchedCardsArray.push(enrichedCard);
        }
      } catch (error) {
        console.error("Error fetching matching cards:", error);
      }
    }

    setMatchingCards(matchedCardsArray);
  }

  return (
    <>
      {error}
      <h1>Search</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="flex-end">
          <TextInput
            placeholder="Enter search terms"
            key={form.key("q")}
            label="Search"
            {...form.getInputProps("q")}
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
      <SortComponent />
      <Grid>
        {data.results &&
          data?.results.map((record) => {
            // Find the enriched card for the current record
            const correspondingCard = matchingCards.find(
              (card: WilderKindCardType) => card.taxon_id === record.id,
            );

            return (
              <GridCol
                span={{ base: 6, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={record.id}
              >
                <GenericCard record={record} />
                {/*<Card key={record.id}>*/}
                {/*  <Title size="h4">{record.preferred_common_name}</Title>*/}
                {/*  <Title size="h5">{record.name}</Title>*/}
                {/*  <p>ID: {record.id}</p>*/}
                {/*  {record.wikipedia_url && (*/}
                {/*    <Link to={record.wikipedia_url}>Wikipedia link</Link>*/}
                {/*  )}*/}

                {/*  {record.default_photo && (*/}
                {/*    <Link to={record.default_photo?.medium_url}>*/}
                {/*      <Image*/}
                {/*        src={record.default_photo?.url}*/}
                {/*        // radius='lg'*/}
                {/*        // w={200}*/}
                {/*      />*/}
                {/*    </Link>*/}
                {/*  )}*/}

                {/*  /!* <Button onClick={() => searchCards(record.id)}>Search cards</Button> *!/*/}

                {/*  {correspondingCard && (*/}
                {/*    <Link*/}
                {/*      to={"/cards/" + correspondingCard.id}*/}
                {/*      key={correspondingCard.id}*/}
                {/*    >*/}
                {/*      in WilderKind index: {correspondingCard.nickname}*/}
                {/*    </Link>*/}
                {/*  )}*/}
                {/*</Card>*/}
              </GridCol>
            );
          })}
      </Grid>
    </>
  );
}

// function SearchResultsGrid(array: []) {}
