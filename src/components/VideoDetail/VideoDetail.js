import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSelectedData } from "../../apis";
import { Store } from "../../store/index";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";
import Linkify from "react-linkify";

const VideoDetail = () => {
  const { globalState, setGlobalState } = useContext(Store);
  const location = useLocation();
  const setSelectedVideo = async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("v");
    await fetchSelectedData(id).then((res) => {
      //res.data.itemsは配列になっているため、中のオブジェクトを取り出す（中身は1個しかないからshit()でOK）
      const item = res.data.items.shift();
      setGlobalState({ type: "SET_SELECTED", payload: { selected: item } });
    });
  };
  //動画の選択時にURLが切り替わるのでレンダリングするように第二引数にURLを設定
  useEffect(() => {
    setSelectedVideo();
  }, [location]);
  return globalState.selected.selected && globalState.selected.selected.id ? (
    <div className={Style.wrapper}>
      <VideoPlay id={globalState.selected.selected.id} />
      <p>{globalState.selected.selected.snippet.title}</p>
      <hr />
      <Linkify>
        {/* descriptionはデータ元で既に整形されているのでpreタグを使用 */}
        <pre>{globalState.selected.selected.snippet.description}</pre>
      </Linkify>
    </div>
  ) : (
    <span>np data</span>
  );
};

export default VideoDetail;
