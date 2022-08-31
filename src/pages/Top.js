import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { fetchPopularData } from "../apis/index";
import { Store } from "../store/index";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import VideoGridItem from "../components/VideoGridItem/VideoGridItem";

const Top = () => {
  const { globalState, setGlobalState } = useContext(Store);

  useEffect(() => {
    fetchPopularData().then((res) => {
      setGlobalState({
        type: "SET_POPULAR",
        payload: { popular: res.data.items },
      });
    });
  }, []);

  return (
    <Layout>
      <VideoGrid>
        {globalState.popular.popular &&
          globalState.popular.popular.map((popular, index) => {
            return (
              <VideoGridItem
                id={popular.id}
                key={index}
                src={popular.snippet.thumbnails.default.url}
                title={popular.snippet.title}
              />
            );
          })}
      </VideoGrid>
    </Layout>
  );
};

export default Top;
