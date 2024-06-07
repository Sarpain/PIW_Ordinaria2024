import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import Fav from "../islands/Fav.tsx";

type Props = {
  videos: Video[];
  userid: string;};

const VideoList: FunctionComponent<Props> = ({ videos, userid }) => {
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <a href={`/video/${video.id}`}>
            <img
              src={video.thumbnail}
              alt={video.title}
            />
            <div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <p>
                Release date: {new Date(video.date).toLocaleDateString()}
              </p>
            </div>
          </a>
          <Fav id={video.id} userid={userid} fav={video.fav} />
        </div>
      ))}
    </div>
  );
};

export default VideoList;