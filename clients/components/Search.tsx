import React from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';
import { environment } from '@/environment';

const searchClient = algoliasearch(environment.algolia.appId, environment.algolia.apiKey);

const FuzzySearch = ({indexName}: {indexName: string}) => {
  return (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      {/* ... */}
    </InstantSearch>
  );
};

export default FuzzySearch;
