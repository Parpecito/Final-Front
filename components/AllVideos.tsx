import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import Fav from "../islands/Fav.tsx";

type Props = {
  videos: Video[];
  userid: string;
};
const AllVideos: FunctionComponent<Props> = ({ videos, userid }) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <div class="video-list-container">
        {videos.length > 0 && videos.map((v) => {
          return (
            <div class="video-item" key={v.id}>
              <a href={`/video/${v.id}`} class="video-link">
                <img src={v.thumbnail} alt={v.title} class="video-thumbnail">
                </img>
                <div class="video-info">
                  <h3 class="video-title">Curso Deno Fresh - Video 1</h3>
                  <p class="video-description">Introduction to Deno Fresh</p>
                  <p class="video-release-date">
                    Release date:{new Date(v.date).toLocaleDateString()}
                  </p>
                </div>
              </a>
              <Fav id={v.id} fav={v.fav} userid={userid}></Fav>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AllVideos;
