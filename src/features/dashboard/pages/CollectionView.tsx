import { useEffect, useState } from "react";

import {
  ComboboxItem,
  ComboboxOptionProps,
  ComboboxProps,
  SelectProps,
} from "@mantine/core";
import { NestContextProps } from "~/features/_shared/contexts/nest/NestProvider";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";
import CollectionSelectBox from "~/features/card/components/CollectionSelectBox.tsx";

export default function CollectionView({ collections }: NestContextProps) {
  const [data, setData] = useState(() => {
    if (collections && collections.length > 0) {
      collections.map((collection) => {
        const dataObject = { value: "", label: "" };
        dataObject.value = collection.id;
        dataObject.label = collection.name;
        return dataObject;
      });
    } else return { value: "11111", label: "oh no" };
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [selectedCollectionName, setSelectedCollectionName] =
    useState<string>("");

  // TODO: Fix for choosing current option (errors with null value)
  function handleSelect(option: ComboboxItem) {
    console.log(option);
    if (option) setSelectedCollectionName((_prevState) => option.value);
    console.log(option.value);
  }

  return (
    <>
      <CollectionSelectBox
        data={data}
        value={selectedCollectionName}
        handleSelect={handleSelect}
      />

      <CardCollection
        collection={() => collections.getCollection(selectedCollectionName)}
      />
    </>
  );
}
