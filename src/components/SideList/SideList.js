import React, { useContext, useEffect } from "react";
import { Store } from "../../store";
import Style from "./SideList.module.scss";
import { fetchRelatedData } from "../../apis/index";
import SideListItem from "../SideListItem/SideListItem";

const SideList = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const setRelatedVideo = async (id) => {
    await fetchRelatedData(id).then((res) => {
      setGlobalState({
        type: "SET_RELATED",
        payload: { related: res.data.items },
      });
    });
  };
  //動画を選択するごとに関連動画はレンダリング必要なので第二引数に選択した動画（selected）を指定
  useEffect(() => {
    setRelatedVideo(globalState.selected.id);
  }, [globalState.selected]);
  return (
    <div className={Style.sidenav}>
      {globalState.related.related ? (
        globalState.related.related.map((video) => {
          return (
            <SideListItem
              id={video.id.videoId}
              key={video.id.videoId}
              src={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
            />
          );
        })
      ) : (
        <span>no data</span>
      )}
    </div>
  );
};

export default SideList;
