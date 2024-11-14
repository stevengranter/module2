import { useEffect, useState } from "react";

import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import { NestProviderState } from "~/features/_shared/contexts/nest/NestProvider.types.ts";
import useNest from "~/features/_shared/contexts/nest/useNest.ts";

type CollectionDropdownProps = {
  userCollections?: string[];
  collectionsIncludingTaxonId?: string[];
  taxonId: string;
};

export function CollectionDropdown({
  userCollections,
  collectionsIncludingTaxonId,
  taxonId,
}: CollectionDropdownProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  // const nestCtx = useNest() as NestContextState;
  // if (!nestCtx) throw new Error("Nest Context is not defined");
  const { collections } = useNest() as NestProviderState;

  const [search, setSearch] = useState("");
  const [allCollections, setAllCollections] = useState(userCollections || []);
  const [selection, setSelection] = useState<string[]>(
    collectionsIncludingTaxonId || [],
  );

  // useEffect(() => {
  //   console.log("displayNotification()");
  //
  //   console.log(collections.error);
  //   displayNotification({ message: collections.error });
  //   console.log(collections.message);
  //   displayNotification({ message: collections.message });
  // }, [collections.error, collections.message]);

  useEffect(() => {
    const collectionNames = collections
      .get()
      .map((collection: { name: string }) => collection.name);
    setAllCollections(collectionNames);
  }, [collections]);

  useEffect(() => {
    const collectionsIncludingTaxonId = collections.getMatchingNames(taxonId);
    collectionsIncludingTaxonId
      ? setSelection(collectionsIncludingTaxonId)
      : null;
  }, [collections, taxonId]);

  const exactOptionMatch = allCollections.some((item) => item === search);

  const handleValueSelect = (val: string) => {
    console.log(`handleValueSelect(${val})`);
    setSearch("");

    if (val === "$create") {
      setAllCollections((current) => [...current, search]);
      setSelection((current) => [...current, search]);
      collections.addItem(taxonId, search);
    } else {
      setSelection((current) =>
        current.includes(val)
          ? current.filter((v) => v !== val)
          : [...current, val],
      );
      collections.addItem(taxonId, val);
    }
  };

  const handleValueRemove = (val: string) => {
    console.log(val);
    setSelection((current) => current.filter((v) => v !== val));
    collections.removeItem(taxonId, val);
  };

  const values = selection.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = allCollections
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
    ));

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
                placeholder="Add to collection (type to search or add)"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace" && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(selection[selection.length - 1]);
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
  );
}
