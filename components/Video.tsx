import { FunctionComponent } from "preact";
import Fav from "../islands/Fav.tsx";
import { Video } from "../types.ts";

type Props = {
  video: Video;
  userid: string;
};

const VideoDetail: FunctionComponent<Props> = ({ video, userid }) => {
  return (
    <div>
      <a href="/videos" >Go Back to List</a>
      <div>
        <iframe
          width="100%"
          height="400px"
          src={`https://www.youtube.com/embed/${video.youtubeid}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        >
        </iframe>
      </div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <Fav id={video.id} fav={video.fav} userid={userid}/>
    </div>
  );
};

export default VideoDetail;