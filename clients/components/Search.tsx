import React, { useState } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearch, useInstantSearch, Hits, Configure, Highlight } from "react-instantsearch";
import { environment } from "@/environment";
import {
  useCombobox,
  Combobox,
  TextInput,
  Kbd,
  Box,
  Loader,
  Group,
  Paper,
  Image,
  Badge
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import type { Hit } from 'instantsearch.js';
import { IconSearch } from "@tabler/icons-react";

const searchClient = algoliasearch(
  environment.algolia.appId,
  environment.algolia.apiKey
);

interface SearchResult {
  objectID: string;
  name: string;
  description: string;
  imageUrl: string;
  baseUnitPrice: number;
  category: { name: string };
}

const FuzzySearch = ({ indexName }: { indexName: string }) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, 500);

  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure hitsPerPage={8} />
      
      <Box style={{ maxWidth: 400, margin: 'auto', position: 'relative' }}>
        {/* Search Input Field */}
        <TextInput
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Tìm kiếm sản phẩm"
          leftSection={<IconSearch size={18} />}
          radius="md"
          size="md"
          styles={(theme) => ({
            input: {
              paddingRight: '40px',
            },
          })}
        />

        {/* Conditionally show search results */}
        {debouncedSearch && <SearchResults />}
      </Box>
    </InstantSearch>
  );
};

// Custom component using useInstantSearch to access the hits and search status
const SearchResults = () => {
  const { results, status } = useInstantSearch();

  // Render loader if still loading
  if (status === 'loading') {
    return (
      <Box mt="sm" p="xs">
        <Loader size="sm" />
      </Box>
    );
  }
console.log(results?.hits)
  // Render search results if available
  if (results?.hits.length > 0) {
    return (
      <Paper
        shadow="md"
        radius="md"
        style={{
          position: 'absolute',
          width: '100%',
          top: '60px',
          zIndex: 10,
          border: '1px solid #ddd',
          maxHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {results.hits.map((hit: SearchResult) => (
          <HitComponent key={hit.objectID} hit={hit} />
        ))}
      </Paper>
    );
  }

  // Fallback for no results
  return (
    <Paper shadow="md" radius="md" mt="sm" p="md">
      <p>No results found.</p>
    </Paper>
  );
};

// Updated HitComponent to display search result
const HitComponent = ({ hit }: { hit: SearchResult }) => {
  return (
    <Paper
      p="sm"
      shadow="xs"
      radius="md"
      mb="sm"
      withBorder
      style={(theme) => ({
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
        transition: 'background-color 0.2s',
        cursor: 'pointer',
      })}
    >
      <Group align="flex-start">
        {/* Product Image */}
        <Image
          src={hit.imageUrl}
          alt={hit.name}
          width={60}
          height={60}
          radius="md"
          fit="cover"
        />

        <div style={{ flex: 1 }}>
          {/* Product Name */}
          <h4 style={{ margin: 0 }}>{hit.name}</h4>
          
          {/* Product Price */}
          <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
            ${hit.baseUnitPrice?.toFixed(2) || 'Price not available'}
          </p>

          {/* Product Category */}
          {hit.category?.name ? (
            <Badge color="teal" variant="light">
              {hit.category.name}
            </Badge>
          ) : (
            <Badge color="gray" variant="light">Category not available</Badge>
          )}
        </div>
      </Group>
    </Paper>
  );
};

export default FuzzySearch;
