import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchData } from "../apis";
import Layout from "../components/layout/Layout";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import VideoGridItem from "../components/VideoGridItem/VideoGridItem";
import { Store } from "../store/index";

const Search = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();
  const setSearchResult = async () => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");
    if (query) {
      await fetchSearchData(query).then((res) => {
        setGlobalState({
          type: "SET_SEARCHED",
          payload: { searched: res.data.items },
        });
      });
    }
  };

  useEffect(() => {
    setSearchResult();
  }, [location.search]);
  return (
    <Layout>
      <VideoGrid>
        {globalState.searched.searched ? (
          globalState.searched.searched.map((search, index) => {
            return (
              <VideoGridItem
                id={search.id}
                key={index}
                src={search.snippet.thumbnails.default.url}
                title={search.snippet.title}
              />
            );
          })
        ) : (
          <span>no data</span>
        )}
      </VideoGrid>
    </Layout>
  );
};

export default Search;
