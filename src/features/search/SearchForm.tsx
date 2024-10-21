import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import { Button, Flex, Grid, GridCol, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { WildCard } from "~/components/card/WildCard.tsx";
import SortComponent from "~/components/ui/controls/SortComponent.tsx";
import { iNatTaxaResponseType } from "~/models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export default function SearchForm() {
  const form = useForm({ mode: "uncontrolled" });
  const [searchParams, setSearchParams] = useSearchParams();
  const [_matchingCards, setMatchingCards] = useState<WilderKindCardType[]>([]);
  const data = useLoaderData() as iNatTaxaResponseType;
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(values: typeof form.values) {
    setSearchParams(values);
  }

  // useEffect(() => {
  //   // if (searchParams.size > 0) console.log(data.results);
  //   // console.log(searchParams.get('q'));
  //   // if (data) searchCards(data).then((r) => console.log(r));
  // }, [searchParams, data]);

  // async function searchCards(data: iNatTaxaResponseType) {
  //   if (!data.results) return;
  //   const { results } = data;
  //   const matchedCardsArray = [];
  //
  //   for (const result of results) {
  //     try {
  //       // console.log(result);
  //
  //       const matchingCardsResult = await fetch(
  //         `${JSON_SERVER_URL}/cards?taxon_id=${result.id}`,
  //       );
  //
  //       if (!matchingCardsResult.ok) {
  //         setError("Network response was not okay");
  //       }
  //
  //       const matchingCardsJSON = await matchingCardsResult.json();
  //
  //       if (matchingCardsJSON.length > 0) {
  //         const match = matchingCardsJSON[0];
  //         const enrichedCard = { ...result, ...match };
  //         matchedCardsArray.push(enrichedCard);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching matching cards:", error);
  //     }
  //   }
  //
  //   return matchedCardsArray;
  // }

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
          data?.results.map((result) => {
            // Find the enriched card for the current result
            // const correspondingCard = matchingCards.find(
            //   (card: WilderKindCardType) => card.taxon_id === result.id,
            // );

            return (
              <GridCol
                span={{ base: 12, xs: 12, sm: 6, md: 6, lg: 4, xl: 3, xxl: 2 }}
                key={result.id}
              >
                <WildCard dataObject={result} />
              </GridCol>
            );
          })}
      </Grid>
    </>
  );
}

// function SearchResultsGrid(array: []) {}
