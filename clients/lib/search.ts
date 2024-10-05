import { environment } from '@/environment';
import algoliasearch from 'algoliasearch/lite';
const searchClient = algoliasearch.liteClient(environment.algolia.appId, environment.algolia.apiKey);
export default searchClient;