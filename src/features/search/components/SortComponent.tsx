import { Select } from '@mantine/core'
export default function SortComponent() {
  return (
    <Select
      data={['WilderKind', 'Observations', 'Name']}
        placeholder='Please select'
      label='Sort by'
    />
  )
}
