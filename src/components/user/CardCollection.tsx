import WilderKindCard from "../card/WilderKindCard.tsx";

export default function CardCollection({
  collection,
}: {
  collection: string[] | undefined;
}) {
  console.log(collection);
  return (
    <>
      {collection?.map((cardId) => {
        return <WilderKindCard cardId={cardId} />;
      })}
    </>
  );
}
