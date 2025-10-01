import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["sw-species"],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div className="loading">Error! {error.toString()}</div>;

  return (
    <InfiniteScroll
      initialLoad={false}
      loadMore={() => {
        if (!isFetching) fetchNextPage();
      }}
      hasMore={hasNextPage}
    >
      {data.pages.map((pageData) => (
        <div key={pageData.next}>
          {pageData.results.map((species) => (
            <Species key={species.name} {...species} />
          ))}
        </div>
      ))}
    </InfiniteScroll>
  );
}
