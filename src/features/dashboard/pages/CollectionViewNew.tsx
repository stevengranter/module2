import useNest from "~/features/_shared/contexts/nest/useNest.ts";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

export default function CollectionViewNew() {
  const { nest, collections } = useNest();

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
