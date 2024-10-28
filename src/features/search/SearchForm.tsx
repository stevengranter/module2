import { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";

import {
  Button,
  Flex,
  Grid,
  GridCol,
  NumberInput,
  Pagination,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { WildCard } from "~/components/card/WildCard.tsx";
import SortComponent from "~/components/ui/controls/SortComponent.tsx";
import { iNatTaxaResponseType } from "~/models/iNatTaxaResponseType.ts";
import { WilderKindCardType } from "~/models/WilderKindCardType.ts";

export default function SearchForm() {
  const form = useForm({ mode: "uncontrolled" });

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(0);

  const [_matchingCards, setMatchingCards] = useState<WilderKindCardType[]>([]);
  const data = useLoaderData() as iNatTaxaResponseType;
  const [error, setError] = useState<string | null>(null);

  if (data) {
    const totalPages = Math.ceil(data.total_results / data.per_page);
    console.log(totalPages);
  }

  function handleSubmit(values: FormValues) {
    console.log(values);
    setSearchParams(values);
  }

  function changePage(pageNumber: number) {
    console.log(`Page #: ${pageNumber} requested`);
    setSearchParams({ page: pageNumber.toString() });
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
          <NumberInput hidden key={form.key("page")}></NumberInput>
          <Button type="submit">Submit</Button>
        </Flex>
        <Pagination
          total={data.results && Math.ceil(data.total_results / data.per_page)}
          defaultValue={1}
          onChange={(page) => changePage(page)}
          key={form.key("page")}
        />
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
