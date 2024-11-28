import { useEffect, useMemo, useState } from "react"

import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core"
import { useLogger } from "~/dev.ts"
import { useCollections } from "~/features/_shared/contexts/collections/useCollections.ts"
import useCollectionActions from "~/features/_shared/hooks/useCollectionActions.ts"

type CollectionDropdownProps = {
  userCollections?: string[]
  collectionsIncludingTaxonId?: string[]
  taxonId: string | number
}

// ... other imports

export function CollectionDropdown({
  collectionsIncludingTaxonId,
  taxonId,
}: CollectionDropdownProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  })
  const collections = useCollections()
  const collectionAction = useCollectionActions()

  const memoizedCollectionAction = useMemo(
    () => collectionAction,
    [collectionAction],
  )
  const memoizedCollections = useMemo(() => collections, [collections])

  const [search, setSearch] = useState("")
  const [selection, setSelection] = useState<string[]>(
    collectionsIncludingTaxonId || [],
  )

  useLogger("CollectionDropdown", [selection])

  useEffect(() => {
    const newCollections =
      memoizedCollectionAction.getCollectionNamesIncludingId(taxonId)
    if (
      newCollections &&
      JSON.stringify(newCollections) !== JSON.stringify(selection)
    ) {
      setSelection(newCollections)
    }
  }, [memoizedCollectionAction, memoizedCollections, taxonId, selection])

  const exactOptionMatch = memoizedCollectionAction
    .getAllCollectionNames()
    .some((item) => item === search)

  const handleValueSelect = (val: string) => {
    console.log(`handleValueSelect(${val})`)
    setSearch("")

    if (val === "$create") {
      collectionAction.getAllCollectionNames()
      setSelection((current) => [...current, search])
      // console.log(search)
      collectionAction.addIdToCollection(taxonId, search)
    } else {
      setSelection((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      )
      // console.log(`taxonID: ${taxonId}`)
      // console.log(`val:`, val)
      !collectionAction.isItemInCollection(taxonId, val)
        ? collectionAction.addIdToCollection(taxonId, val)
        : collectionAction.removeIdFromCollection(taxonId, val)
    }
  }

  const handleValueRemove = (val: string) => {
    console.log(val)
    setSelection((current) => current.filter((v) => v !== val))
    collectionAction.removeIdFromCollection(taxonId, val)
  }

  const values = selection.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ))

  const options = collectionAction
    .getAllCollectionNames()
    .filter((item) =>
      item.toString().toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={selection.includes(item)}
      >
        <Group gap="sm">
          {selection.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ))

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
    >
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Add to collection (type llecto search or add)"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex()
                  setSearch(event.currentTarget.value)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault()
                    handleValueRemove(selection[selection.length - 1])
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}

          {!exactOptionMatch && search.trim().length > 0 && (
            <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
          )}

          {exactOptionMatch &&
            search.trim().length > 0 &&
            options.length === 0 && (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}
