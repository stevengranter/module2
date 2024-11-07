import { useEffect, useState } from "react";

import getWilderKindCards from "~/features/_shared/utils/getWilderKindCards.ts";
import CardCollection from "~/features/card/components/CardCollection/CardCollection.tsx";

export default function FeaturedCards() {
  const [featuredCards, setFeaturedCards] = useState([]);
  useEffect(() => {
    const cards = getWilderKindCards().then((cards) => {
      console.log(cards);
      setFeaturedCards(cards);
      console.log(featuredCards);
    });
  }, []);
  return <CardCollection collection={featuredCards} />;
}
