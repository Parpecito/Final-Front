import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import Fav from "../islands/Fav.tsx";

type Data = {
  video: Video;
  userid: string;
};

const VideoUnico: FunctionComponent<Data> = ({ video, userid }) => {
  return (
    <div class="video-detail-container">
      <a href="/videos" class="back-button">← Go Back to List</a>
      <div class="video-frame">
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${video.youtubeid}`}
          title="Curso Deno Fresh - Video 1"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
        </div>
        <h2 class="video-detail-title">{video.title}</h2>
        <p class="video-detail-description">{video.description}</p>
        <Fav id={video.id} fav={video.fav} userid={userid}></Fav>
    </div>
  );
};
export default VideoUnico
