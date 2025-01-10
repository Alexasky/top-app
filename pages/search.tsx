import React, { useEffect, useState } from 'react';
import { withLayout } from '../layout/Layout';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API } from '../helpers/api';
import { TopPageModel } from '../interfaces/page.interface';
import { SearchPageComponent } from '../page-components/SearchComponent/SearchPageComponent';



function Search(): JSX.Element {
	const router = useRouter();
  const { q } = router.query;
  const [searchResults, setSearchResults] = useState<TopPageModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (q) {					
      const fetchSearchResult = async () => {
				if (!q || typeof q !== "string") {
					setLoading(false);
					return;
				}
        setLoading(true);
        try {
					const { data: searchResponse } = await axios.get<TopPageModel[]>(`${API.search.textSearch}${encodeURIComponent(q)}`);
					searchResponse.map(({_id, firstCategory, alias, title, metaDescription}) => ({
						_id,
						firstCategory,
						alias,
						title,
						metaDescription
					}));
          setSearchResults(searchResponse || []);
        } catch (error: any) {
          console.error("Error fetching search results:", error.message);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchSearchResult();
    }
  }, [q]);
	return (
    <SearchPageComponent searchResults={searchResults} loading={loading} q={q} />
  );
}

export default withLayout(Search);