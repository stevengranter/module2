import { useEffect, useState } from "react";

import {
  ComboboxItem,
  ComboboxOptionProps,
  ComboboxProps,
  SelectProps,
  Text,
} from "@mantine/core";
import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { log } from "~/features/_shared/utils/dev.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx";

export default function CollectionView({
  collections,
  nest,
}: NestProviderState) {
  const [selectableCollections, setSelectableCollections] = useState(() => {
    let dataArray = [];
    if (collections && collections.get().length > 0) {
      dataArray = collections.get().map((collection: Collection) => {
        const dataObject = { value: "", label: "" };
        dataObject.value = collection.id;
        dataObject.label = collection.name;
        return dataObject;
      });
    } else {
      return "";
    }
    return dataArray;
  });

  const nestArray = nest.get();

  const [selectedCollectionId, setSelectedCollectionId] = useState<
    string | null
  >(null);

  const [itemIdsArray, setItemIdsArray] = useState<string[]>([]);

  useEffect(() => {
    if (selectableCollections && selectableCollections.length > 0)
      log(selectableCollections);
  }, [selectableCollections]);

  // TODO: Fix for choosing current option (errors with null value)
  function handleSelect(selectedValue: ComboboxItem) {
    console.log(selectedValue);
    if (selectedValue) setSelectedCollectionId(selectedValue);
    console.log(selectedValue);
  }

  // useEffect(() => {
  //   const collection = collections
  //     .get()
  //     .filter((collection) => collection.id === selectedCollectionId);
  //   console.dir("collection", collection[0]);
  //   console.log(collections);
  //   if (!collections) throw new Error("Collection not found");
  //   const itemIds = collection[0].items;
  //   console.log(itemIds);
  //   setItemIdsArray(itemIds);
  // }, [selectedCollectionId]);

  return collections && collections.length > 0 ? (
    <>
      <CollectionSelectBox
        data={selectableCollections}
        value={selectedCollectionId}
        handleSelect={handleSelect}
      />

      <CardCollection
        itemIdArray={itemIdsArray}
        collectionId={selectedCollectionId}
      />
    </>
  ) : (
    <>
      <Text>No collections found</Text>
      <CardCollection itemIdArray={nestArray} />
    </>
  );
}
