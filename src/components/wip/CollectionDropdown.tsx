import { useEffect, useState } from "react";

import { MultiSelect } from "@mantine/core";
import { JSON_SERVER_URL } from "~/lib/constants.ts";

export default function CollectionDropdown({ cardId }) {
  const [collections, setCollections] = useState<
    {
      id: string;
      name: string;
      items: [];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  let data;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`${JSON_SERVER_URL}/users/1`);
        const data = await response.json();
        const collections = data.collections;
        setCollections(collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <p>Loading collections...</p>;
  }

  if (collections) {
    data = collections.map((collection) => {
      return { value: collection.id, label: collection.name };
    });
  }

  return (
    <MultiSelect
      label="Add to collection(s)"
      placeholder="Choose collection(s)"
      data={data}
    ></MultiSelect>
  );
}
