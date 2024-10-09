import React, { useState } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, useInstantSearch, Hits } from "react-instantsearch";
import { environment } from "@/environment";
import {
  useCombobox,
  Combobox,
  TextInput,
  Kbd,
  Box,
  Loader,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);

interface SearchResult {
  objectID: string;
  name: string;
  description: string;
}

function FuzzySearch({ indexName }: { indexName: string }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500); // Debounce the search input by 500ms
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const combobox = useCombobox();

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName} future={{preserveSharedStateOnUnmount:true}}>
      <SearchBoxComponent
        search={search}
        setSearch={setSearch}
        combobox={combobox}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        debouncedSearch={debouncedSearch}
      />
    </InstantSearch>
  );
}

const SearchBoxComponent = ({
  search,
  setSearch,
  combobox,
  selectedItem,
  setSelectedItem,
  debouncedSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
  combobox: any;
  selectedItem: string | null;
  setSelectedItem: (value: string | null) => void;
  debouncedSearch: string;
}) => {
  const { results, status } = useInstantSearch();

  // Filter and map results from Algolia
  const searchResults = results.hits.map((hit: SearchResult) => (
    <Combobox.Option value={hit.name} key={hit.objectID}>
      {hit.name}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={600}
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        {/* Customized TextInput */}
        <TextInput
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Search"
          leftSection={<IconSearch size={18} />} // Adding search icon
          rightSectionWidth={90}
          style={(theme) => ({
            input: {
              backgroundColor: theme.colors.dark[6],
              borderColor: theme.colors.dark[4],
              color: theme.colors.gray[0],
              paddingRight: "50px", // Adjust for the right section
              paddingLeft: "40px", // Adjust for the icon
              height: "40px",
            },
            rightSection: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.colors.dark[7],
              borderRadius: "4px",
              padding: "4px 8px",
            },
          })}
        />
      </Combobox.Target>

      {/* Search Dropdown */}
      <Combobox.Dropdown>
        {status === "loading" && (
          <Box mt="sm" p="xs">
            <Loader size="sm" />
          </Box>
        )}
        <Hits
          hitComponent={(hit) =>
            <Combobox.Options>
              {hit.length > 0 ? (
                searchResults
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </Combobox.Options>
          }
        />
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default FuzzySearch;
