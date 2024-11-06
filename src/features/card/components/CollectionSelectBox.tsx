import { Select } from "@mantine/core";

export default function CollectionSelectBox({
  data,
  value,
}: {
  data: string[];
  value?: string;
}) {
  console.log(data);
  return (
    data.length !== 0 && (
      <Select
        label="Choose collection to display"
        placeholder="Pick value"
        data={data}
        value={value}
      />
    )
  );
}
