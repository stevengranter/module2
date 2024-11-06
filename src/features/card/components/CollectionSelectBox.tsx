import { ComboboxData, ComboboxItem, Select } from "@mantine/core";

export default function CollectionSelectBox({
  data,
  value,
  handleSelect,
}: {
  data: ComboboxData;
  value: string;
  handleSelect: (option: string) => void;
}) {
  console.log(data);
  return (
    data.length !== 0 && (
      <Select
        label="Choose collection to display"
        placeholder="Pick value"
        data={data}
        value={value}
        onChange={(_value, option) => handleSelect(option.value)}
      />
    )
  );
}
