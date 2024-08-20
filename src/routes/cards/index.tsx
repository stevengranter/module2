// import { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

import { TextInput, GridCol, Center, Grid } from '@mantine/core';
import wretch from 'wretch';

import SpeciesCard from '../../components/SpeciesCard';
import { speciesType } from '../../models/speciesType';
import { jsonServerUrl } from '../../utils/constants';
import styles from './Index.module.css';

export function CardIndexRoute() {
  const data = useLoaderData() as speciesType[];

  return (
    <>
      <h2>Welcome to the WilderKind Index</h2>
      <TextInput
        description='Input description'
        placeholder='Input placeholder'
        label='Input label'
      ></TextInput>
      <Center>
        <Grid>
          {data?.map((item: speciesType) => (
            <GridCol
              span={{ base: 12, xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}
              key={item.id}
            >
              <Link
                style={{ textDecoration: 'none' }}
                to={item.id.toString()}
              >
                <SpeciesCard {...item} />
              </Link>
            </GridCol>
          ))}
        </Grid>
      </Center>
    </>
  );
}
