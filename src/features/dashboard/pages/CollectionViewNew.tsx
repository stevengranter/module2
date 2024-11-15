import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";

export default function CollectionViewNew({
  nest,
  collections,
}: NestProviderState) {
  return (
    <>
      {collections &&
        collections.get().map((collection) => (
          <li key={collection.id}>
            {collection.name}
            <ul>
              {collection.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
    </>
  );
}
