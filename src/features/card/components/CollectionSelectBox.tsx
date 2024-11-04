import { Select } from "@mantine/core";

export default function CollectionSelectBox({
  data,
  value,
}: {
  data: string[];
  value: string;
}) {
  return (
    <Select
      label="Choose collection to display"
      placeholder="Pick value"
      data={data}
      value={value}
    />
  );
}
