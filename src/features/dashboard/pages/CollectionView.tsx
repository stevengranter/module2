import { useEffect, useState } from "react";

import {
  ComboboxItem,
  ComboboxOptionProps,
  ComboboxProps,
  SelectProps,
} from "@mantine/core";
import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { Collection } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import { log } from "~/features/_shared/utils/dev.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx";

export default function CollectionView({ collections }: NestProviderState) {
  const [data, setData] = useState(() => {
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

  const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
  // const [selectedCollectionName, setSelectedCollectionName] = useState<string>("");
  const [itemIds, setItemIds] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.length > 0) log(data);
  }, [data]);
  //
  // useEffect(() => {
  //   if (selectedCollectionId)
  //     log(`selectedCollectionId: ${selectedCollectionId}`);
  //   const [collection] = collections
  //     .get()
  //     .filter((collection) => collection.id === selectedCollectionId);
  //   if (collection) console.log(collection);
  //   const itemIds = collection.items;
  //   console.log(itemIds);
  //   setItemIds([...itemIds]);
  // }, [collections, selectedCollectionId]);

  // TODO: Fix for choosing current option (errors with null value)
  function handleSelect(selectedValue: ComboboxItem) {
    console.log(selectedValue);
    if (selectedValue) setSelectedCollectionId(selectedValue);
    console.log(selectedValue);
  }

  useEffect(() => {
    const collection = collections
      .get()
      .filter((collection) => collection.id === selectedCollectionId);
    console.dir("collection", collection[0]);
    const itemIds = collection[0].items;
    console.log(itemIds);
    setItemIds(itemIds);
  }, [selectedCollectionId]);

  function getItemIds() {
    const collection = collections
      .get()
      .filter((collection) => collection.id === selectedCollectionId);
    console.dir("collection", collection[0]);
    const itemIds = collection[0].items;
    console.log(itemIds);
    return itemIds;
  }
  return (
    <>
      <CollectionSelectBox
        data={data}
        value={selectedCollectionId}
        handleSelect={handleSelect}
      />

      <CardCollection collection={itemIds} />
    </>
  );
}
