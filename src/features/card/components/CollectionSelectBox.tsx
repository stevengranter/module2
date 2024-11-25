import { ComboboxData, Select } from "@mantine/core"

export default function CollectionSelectBox({
  data,
  value,
  handleSelectFn,
}: {
  data: ComboboxData
  value: string | null | undefined
  handleSelectFn: (selectedValue: string) => void
}) {
  return (
    data &&
    data.length !== 0 && (
      <Select
        label="Choose collection to display"
        placeholder="Pick value"
        data={data}
        value={value}
        onChange={(_, option) => handleSelectFn(option.value)}
      />
    )
  )
}
