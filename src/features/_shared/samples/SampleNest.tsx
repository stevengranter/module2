import { useContext, useState } from "react";

import {
  Button,
  Fieldset,
  Group,
  NumberInput,
  Space,
  TextInput,
  Title,
} from "@mantine/core";
import { NestContext } from "~/features/_shared/contexts/nest/NestProvider.tsx";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { CollectionDropdown } from "~/features/card/components/CardCollection/CollectionDropdown.tsx";

export default function SampleNest() {
  const { nest, collections } = useNest();
  const [id, setId] = useState<string | number>(null);
  const [collection, setCollection] = useState<string>("");
  const [newCollection, setNewCollection] = useState<string>("");
  const [collectionsSelected, setCollectionsSelected] = useState([]);

  return (
    <>
      <Title order={2}>Sample Nest</Title>
      <Fieldset legend="Get Data">
        <Button onClick={() => nest.get()}>Get Nest</Button>
        <Button onClick={() => collections.get()}>Get Collections</Button>
      </Fieldset>
      <Fieldset legend="Create collection">
        <TextInput
          value={newCollection}
          onChange={(e) => setNewCollection(e.target.value)}
        />
        <Button onClick={() => collections.create(newCollection)}>
          Add Collection
        </Button>
      </Fieldset>
      <Fieldset legend="Add Ids">
        <Group pb={10}>
          <NumberInput label="Id" value={id} onChange={setId}></NumberInput>
          <TextInput
            label="Collection"
            value={collection}
            onChange={(event) => setCollection(event.currentTarget.value)}
          ></TextInput>
          {/*<CollectionDropdown*/}
          {/*  initialValue={() => {*/}
          {/*    // console.log(collections.getMatchingNames(id));*/}
          {/*    return collections.getMatchingNames(id);*/}
          {/*  }}*/}
          {/*  userCollections={() =>*/}
          {/*    collections.get().map((collection) => collection.name)*/}
          {/*  }*/}
          {/*  taxonId={id}*/}
          {/*/>*/}
        </Group>
        <Space></Space>
        <Button onClick={() => nest.addId(id)}>Add iD to nest</Button>
        <Button onClick={() => collections.addId(id, collection)}>
          Add iD to collection
        </Button>

        <Button onClick={() => collections.removeId(id, collection)}>
          Remove id from collection
        </Button>
        <Button
          onClick={() => {
            console.log(collections.getMatchingNames(id));
            return collections.getMatchingNames(id);
          }}
        >
          Get Matching Collections
        </Button>
      </Fieldset>
    </>
  );
}
