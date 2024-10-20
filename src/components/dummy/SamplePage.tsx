import { WildCard } from "~/components/card/WildCard.tsx";

const mockData = { id: "2323", name: "spider" };

export default function SamplePage() {
  return (
    <>
      <WildCard dataObject={mockData} id="" />;
    </>
  );
}
