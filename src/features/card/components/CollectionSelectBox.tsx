import { ComboboxData, ComboboxItem, Select } from "@mantine/core"

export default function CollectionSelectBox({
  data,
  value,
  handleSelectFn,
}: {
  data: ComboboxData
  value: string | null | undefined
  handleSelectFn: (option: string) => void
}) {
  return (
    data &&
    data.length !== 0 && (
      <Select
        label="Choose collection to display"
        placeholder="Pick value"
        data={data}
        value={value}
        onChange={(_value, option) => handleSelectFn(option.value)}
      />
    )
  )
}
