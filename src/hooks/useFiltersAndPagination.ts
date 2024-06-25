import { Sort } from "@/components/sections/Tables/Countries/Columns";
import { BasicFilters } from "@/types/Pagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useFiltersAndPagination = <T extends BasicFilters>(
  filterKeys: (keyof T)[],
  limit: number = 10
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [hasAdditionalFilter, sethasAdditionalFilter] = useState(false);

  const initialFilters = useMemo<T>(() => {
    console.log("INIT FILTER");
    // Initialize the filter with page and limit
    const newFilter: BasicFilters = {
      page: parseInt(searchParams.get("page") as string) || 1,
      sorts: searchParams.get("sorts"),
      limit,
    };

    // Add additional filters based on filterKeys
    filterKeys.forEach((key) => {
      const value = searchParams.get(key as string);
      if (value !== null) {
        !hasAdditionalFilter && sethasAdditionalFilter(true);
        newFilter[key as string] = value;
      }
    });

    // Type assertion to T
    return newFilter as T;
  }, []);

  const [filters, setFilters] = useState(initialFilters);

  const getSortsFromFilters = (filter: BasicFilters): Sort[] => {
    console.log("GET SORTS FROM FILTER");
    const sortsParams = filter.sorts;
    const sorts: Sort[] = [];
    if (sortsParams) {
      const sortsParamsArray = sortsParams.split(",");
      if (sortsParamsArray.length > 0) {
        for (const sortsParam of sortsParamsArray) {
          const sortKeyPair = sortsParam.split(":");
          if (sortKeyPair.length === 2) {
            const key = sortKeyPair[0];
            const order = sortKeyPair[1];
            if (order === "asc" || order === "desc") {
              sorts.push({ key, order });
            }
          }
        }
      }
    }
    return sorts;
  };

  const sorts = useMemo<Sort[]>(() => getSortsFromFilters(filters), [filters]);

  const createParamsStringFromFilters = useMemo((): string => {
    console.log("CREATE PARAMS STRING");
    let paramsString = "?";
    const entriesParams = Object.entries(filters);
    const entriesParamsString: string[] = [];
    for (const [key, value] of entriesParams) {
      if (value && value !== "null") {
        const entryString = `${key}=${value}`;
        entriesParamsString.push(entryString);
      }
    }
    return (paramsString += entriesParamsString.join("&"));
  }, [filters]);

  const [apiParamsString, setApiParamsString] = useState(
    createParamsStringFromFilters
  );

  const getQueryParamsFromFilter = useMemo((): URLSearchParams => {
    console.log("CREATE QUERY STRING");
    const entriesParams = Object.entries(filters);
    const newQueryParams = new URLSearchParams();
    for (const [key, value] of entriesParams) {
      if (value && value !== "null" && key !== "limit") {
        newQueryParams.set(key, `${value}`);
      }
    }
    return newQueryParams;
  }, [filters]);

  const updateParams = useCallback(() => {
    setApiParamsString(createParamsStringFromFilters);
    setSearchParams(getQueryParamsFromFilter);
  }, [
    getQueryParamsFromFilter,
    createParamsStringFromFilters,
    setSearchParams,
  ]);

  useEffect(() => {
    updateParams();
  }, [updateParams]);

  const updateFilters = useCallback((key: string, value: string | null) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
      page: 1,
    }));
    sethasAdditionalFilter(true);
  }, []);

  const clearFilters = () => {
    const newFilter: BasicFilters = {
      page: parseInt(searchParams.get("page") as string) || 1,
      sorts: searchParams.get("sorts"),
      limit,
    };

    setFilters(newFilter as T);
    sethasAdditionalFilter(false);
  };

  const nextPage = () => {
    if (filters.page - 1 !== 0) {
      setFilters((previousFilters) => ({
        ...previousFilters,
        page: previousFilters.page - 1,
      }));
    }
  };

  const previousPage = () => {
    if (filters.page + 1 <= totalPages) {
      setFilters((previousFilters) => ({
        ...previousFilters,
        page: previousFilters.page + 1,
      }));
    }
  };

  const goToIndexPage = (indexPage: number) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      page: indexPage,
    }));
  };

  const updateSorts = useCallback(
    (sortKey: string, sortOrder: false | "asc" | "desc") => {
      console.log("UPDATE SORTS");
      const sortsFilter = sorts.filter((sort) => sort.key !== sortKey);
      if (sortOrder === "asc" || sortOrder === "desc") {
        const newSort: Sort = { key: sortKey, order: sortOrder };
        sortsFilter.push(newSort);
      }
      setFilters((previousFilters) => ({
        ...previousFilters,
        sorts: createSortingParams(sortsFilter),
      }));
    },
    [sorts]
  );

  const createSortingParams = (sorts: Sort[]): string | null => {
    console.log("CREATE SORTING PARAMS");
    const paramsSortsStrings = sorts.map((sort) => `${sort.key}:${sort.order}`);
    const paramsString = paramsSortsStrings.join(",");
    if (!paramsString) {
      return null;
    }
    return paramsString;
  };

  return {
    filters,
    hasAdditionalFilter,
    sorts,
    apiParamsString,
    totalPages,
    limit,
    updateFilters,
    clearFilters,
    updateSorts,
    nextPage,
    previousPage,
    setTotalPages,
    goToIndexPage,
  };
};

export default useFiltersAndPagination;
