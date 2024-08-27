// /search/index.tsx

import { useEffect, useState } from 'react';
import { useSearchParams, useLoaderData, Link } from 'react-router-dom';

import {
  TextInput,
  GridCol,
  Button,
  Title,
  Image,
  Flex,
  Card,
  Grid,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import SpeciesCard from 'components/SpeciesCard';
import { EnrichedCardType } from 'models/EnrichedCardType';
import { iNatTaxaResponseType } from 'models/iNatTaxaResponseType';
import { SpeciesCardType } from 'models/SpeciesCardType';
import { jsonServerUrl } from 'utils/constants';

export default function SearchIndex() {
  const form = useForm({ mode: 'uncontrolled' });
  const [searchParams, setSearchParams] = useSearchParams();
  const [matchingCards, setMatchingCards] = useState([]);
  const data = useLoaderData() as iNatTaxaResponseType;

  function handleSubmit(values) {
    setSearchParams(values);
    console.log(values);
  }

  useEffect(() => {
    console.log('side effect');
    if (searchParams.size > 0) console.log(data.results);
    // console.log(searchParams.get('q'));
    if (data) searchCards(data);
  }, [searchParams]);

  async function searchCards(data) {
    if (!data.results) return;
    const { results } = data;
    const matchedCardsArray = [];

    for (const result of results) {
      try {
        // console.log(result);

        const matchingCardsResult = await fetch(
          `${jsonServerUrl}/cards?taxon_id=${result.id}`
        );

        if (!matchingCardsResult.ok) {
          throw new Error('Network response was not ok');
        }

        const matchingCardsJSON = await matchingCardsResult.json();

        if (matchingCardsJSON.length > 0) {
          const match = matchingCardsJSON[0];
          const enrichedCard = { ...result, ...match };
          matchedCardsArray.push(enrichedCard);
        }
      } catch (error) {
        console.error('Error fetching matching cards:', error);
      }
    }

    setMatchingCards(matchedCardsArray);
    console.log(matchedCardsArray);
  }

  return (
    <>
      <h1>Search</h1>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex align='flex-end'>
          <TextInput
            placeholder='Enter search terms'
            key={form.key('q')}
            label='Search'
            {...form.getInputProps('q')}
          />
          <Button type='submit'>Submit</Button>
        </Flex>
      </form>
      <Grid>
        {data.results &&
          data?.results.map((record) => {
            // Find the enriched card for the current record
            const correspondingCard = matchingCards.find(
              (card) => card.taxon_id === record.id
            );
            console.log(correspondingCard);

            return (
              <GridCol
                span={{ base: 6, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
                key={record.id}
              >
                <Card key={record.id}>
                  <Title size='h4'>{record.preferred_common_name}</Title>
                  <Title size='h5'>{record.name}</Title>
                  <Image
                    src={record.default_photo?.url}
                    // radius='lg'
                    // w={200}
                  />
                  {/* <Button onClick={() => searchCards(record.id)}>Search cards</Button> */}

                  {correspondingCard && (
                    <Link
                      to={'/cards/' + correspondingCard.id}
                      key={correspondingCard.id}
                    >
                      in WilderKind index: {correspondingCard.nickname}
                    </Link>
                  )}
                </Card>
              </GridCol>
            );
          })}
      </Grid>
    </>
  );
}

function SearchResultsGrid(array: []) {}
