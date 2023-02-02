/* eslint-disable prettier/prettier */
// import { duration } from "@mui/material/styles/createTransitions";
import React, { useContext, useRef } from "react";
// import { AiTwotoneHeart } from "react-icons/ai";
import lemonade from "../../assets/new-release/lemonade.png";
import lizzo from "../../assets/new-release/lizzo.png";
import honk from "../../assets/new-release/honk.png";
import lostplanet from "../../assets/new-release/lost planet.png";
import ghetto from "../../assets/new-release/ghettobaby.png";
import Notwaving from "../../assets/new-release/no-waving.png";
import Newrelease from "./Newrelease.module.css";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import newlem from "../../assets/new-release/newlem.png";
import newBowie from "../../assets/new-release/newBowie.png";
import powerwolf from "../../assets/new-release/powerwolf.png";
import newHook from "../../assets/new-release/newHook.png";
import newFleet from "../../assets/new-release/newFleet.png";
import sunlight from "../../assets/new-release/sunlight.png";
import Playerbar from "../../Components/Playerbar/Playerbar";
import { Link } from "react-router-dom";
import { DataContext } from "../../useContext";
import { AllContext, AllPlayerContext, MusicContent} from "../../useContext/interface";
import BrowseDetailcss from "../BrowseDetails/BrowseDetails.module.css";
import { PlayerContext } from "../../useContext/PlayerBarContext";

const NewRelease = () => {
  const { artist, genres, latestSongs } = useContext(DataContext) as AllContext;
  const isNowPlaying = useRef(0);
  const { handleSongPlay } = useContext(
    PlayerContext
  ) as AllPlayerContext;

  return (
    <React.Fragment>
      <div style={{ padding: "0% 8%" }}>
        <div className={Newrelease.title}>
          <div className={Newrelease.playlist}>This month's top releases</div>
          <div className={Newrelease.playlist2}>
            <AiOutlineLeft />
            <AiOutlineRight />
          </div>
        </div>

        <div className={Newrelease.container}>
          <div className={BrowseDetailcss.header}>
            <span>New releases for you</span>
            <Link to={"/new-release"} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <div className={Newrelease.musicContainer}>
            {latestSongs.length > 0 &&
              latestSongs.map((song) => (
                <div
                  key={song.id}
                  className={Newrelease.music}
                  onClick={() => {
                    handleSongPlay(latestSongs, song.id);
                  }}
                >
                  <div className={Newrelease.musicImg}>
                    <img src={song.imageUrl} alt='lp5' />
                    <div className={Newrelease.description}>{song.title}</div>
                    <div className={Newrelease.artists}>{song.artist}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>
    </React.Fragment>
  );
};

export default NewRelease;
