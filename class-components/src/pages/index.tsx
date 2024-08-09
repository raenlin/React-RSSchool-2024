import React, { useEffect, useState } from 'react';
import Search from '../components/Search/search';
import Main from '../components/Main/main';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import { planetsApi } from '../store/planetsApi';
import { Planet } from '../utils/types';
import { pagePlanetsCount } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addItems } from '../store/cardsSlice';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    page: NumberParam,
  });

  const { data, error, isLoading } = planetsApi.useGetPlanetsQuery({
    search: searchInput || '',
    page: query.page || 1,
  });

  const items: Planet[] = data ? data.results : [];
  const planetsCount: number = data ? data.count : 0;
  const pagesCount = Math.ceil(planetsCount / pagePlanetsCount);
  const pages: number[] = searchInput ? [] : Array.from({ length: pagesCount }, (_, i) => i + 1);

  useEffect(() => {
    if (items.length > 0) {
      dispatch(addItems(items));
    }
  }, [items]);

  useEffect(() => {
    setQuery({ search: '', page: 1 });
  }, []);

  const handleFetchData = (searchInput: string) => {
    setSearchInput(searchInput.trim());
  };

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <Search onSearch={handleFetchData} setquery={setQuery} />
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <Main items={items} pages={pages} setquery={setQuery} query={query.page} />
      )}
    </>
  );
}
