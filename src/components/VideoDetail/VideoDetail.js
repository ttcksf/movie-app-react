import React, { useContext } from "react";
import { Store } from "../../store/index";
import VideoPlay from "../VideoPlay/VideoPlay";
import Style from "./VideoDetail.module.scss";
import Linkify from "react-linkify";

const VideoDetail = () => {
  const { globalState } = useContext(Store);

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
