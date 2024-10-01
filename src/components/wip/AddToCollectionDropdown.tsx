import { Card } from "@mantine/core";

const collections = [
  { id: crypto.randomUUID(), name: "favorites", items: [1, 2, 3] },
  { id: crypto.randomUUID(), name: "bugs", items: [3, 4, 6] },
  { id: crypto.randomUUID(), name: "default", items: [6, 1, 7, 8] },
];

const cards = [
  { name: "Hooloo", id: 1 },
  { name: "Juju", id: 2 },
  { name: "Wewa", id: 3 },
];

function getCollectionNames(collections) {
  return collections.map((collection) => collection.name);
}

function isCardInCollection(cardId, collection) {
  return collection.includes(cardId);
}

function SampleCard({ cardId, children }) {
  return <Card>{children}</Card>;
}

function Collection({ collection }) {
  return collection.map((card) => <SampleCard cardId={id}>child</SampleCard>);
}

export default function AddToCollectionDropDown({ cardId }) {
  console.log(getCollectionNames(collections));
  return collections.map((collection) => {
    if (collection.items.includes(cardId)) return "yes";
  });
}
