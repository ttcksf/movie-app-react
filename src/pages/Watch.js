import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import SideList from "../components/SideList/SideList";
import VideoDetail from "../components/VideoDetail/VideoDetail";
import { Store } from "../store/index";
import { fetchSelectedData, fetchRelatedData } from "../apis/index";

const Watch = () => {
  const { setGlobalState } = useContext(Store);
  const location = useLocation();
  const setVideos = async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("v");
    if (id) {
      //Promise.allでfetchSelectedData(動画の詳細表示)とfetchRelatedData(関連動画の表示)の両方が終わるまで待機するようにする。遅延対策。
      const [selected, related] = await Promise.all([
        fetchSelectedData(id),
        fetchRelatedData(id),
      ]);
      setGlobalState({
        type: "SET_SELECTED",
        //res.data.itemsは配列になっているため、中のオブジェクトを取り出す（中身は1個しかないからshit()でOK）
        payload: { selected: selected.data.items.shift() },
      });
      setGlobalState({
        type: "SET_RELATED",
        payload: { related: related.data.items },
      });
    }
  };
  useEffect(() => {
    // setVideos();
  }, [location.search]);
  return (
    <Layout>
      <VideoDetail />
      <SideList />
    </Layout>
  );
};

export default Watch;
