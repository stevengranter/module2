import { useEffect, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { WildCard } from "~/features/card/components/WildCard/WildCard.tsx";

export default function SearchPage() {
  const form = useForm({ mode: "uncontrolled" });

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { data, error, isLoading } = useQuery({
    // Default queryFn is queryINatAPI (
    queryKey: [`/taxa?${searchParams}`],
    // Only run query if we have searchParams
    enabled: !!searchParams.get("q"),
  });

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // console.log(currentParams);
  }, [searchParams]);

  useEffect(() => {
    // console.log(`Data updated`);
    // console.log(data);
    if (data) {
      const totalPageNumber = Math.ceil(data.total_results / data.per_page);
      setTotalPages(totalPageNumber);
    }
  }, [data]);

  function handleSubmit(values: FormValues) {
    setPageNumber(1);
    setTotalPages(0);
    console.log(values);
    setSearchParams(values);
  }

  function changePage(pageNumber: number) {
    console.log(`Page #: ${pageNumber} requested`);
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({ ...currentParams, page: pageNumber.toString() });
    console.log(searchParams.get("page"));
    setPageNumber(pageNumber);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>SearchPage</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex align="flex-end">
          <TextInput
            placeholder="Enter search terms"
            key={form.key("q")}
            label="SearchPage"
            {...form.getInputProps("q")}
          />
          <Button type="submit">Submit</Button>
        </Flex>

        <div>
          {data && data.total_results && `Total results: ${data.total_results}`}
        </div>
        <div>
          {data && data.total_results && `Page: ${pageNumber} of ${totalPages}`}
        </div>
        <div>
          {data && data.per_page && `Results per page: ${data.per_page}`}
        </div>
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            defaultValue={1}
            onChange={(page) => changePage(page)}
            key={form.key("page")}
          />
        )}
      </form>

      {isLoading && "Loading..."}
      {data && (
        <Grid>
          {data.results &&
            data?.results.map((result) => {
              // Find the enriched card for the current result
              // const correspondingCard = matchingCards.find(
              //   (card: WilderKindCardType) => card.taxon_id === result.id,
              // );

              return (
                <GridCol
                  span={{
                    base: 12,
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 4,
                    xl: 3,
                    xxl: 2,
                  }}
                  key={result.id}
                >
                  <WildCard dataObject={result} />
                </GridCol>
              );
            })}
        </Grid>
      )}
    </>
  );
}
