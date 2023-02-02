/* eslint-disable array-callback-return */
import { useContext, useEffect, useRef, useState } from "react";
import { AiTwotoneHeart } from "react-icons/ai";
import { DataContext } from "../../useContext";
import {
    AllContext,
    AllPlayerContext,
    MusicContent,
} from "../../useContext/interface";
import { PlayerContext } from "../../useContext/PlayerBarContext";
import BrowseDetails from "./styles/BrowseDetails.module.css";
// import sam from "../../assets/sam.png";
const Post = (props: any) => {
    const { playlist } = useContext(DataContext) as AllContext;
    const isNowPlaying = useRef(false);
    const { handleSongPlay } = useContext(
        PlayerContext
    ) as AllPlayerContext;
    const [firstPlaylist, setFirstPlaylist] = useState<MusicContent[]>([]);
    useEffect(() => {
        if (playlist.length > 0) {
            setFirstPlaylist(playlist.slice(0, 6));
        }
        console.log(playlist);
    }, [playlist]);
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div className={BrowseDetails.musicContainer}>
            {firstPlaylist.length > 0 &&
                firstPlaylist.map((elem: MusicContent) => (
                    <div
                        className={BrowseDetails.music}
                        key={elem.id}
                        onClick={() => {
                            handleSongPlay(firstPlaylist,elem.id);
                        }}
                    >
                        <div className={BrowseDetails.musicImg}>
                            <img src={elem.imageUrl} alt="deepFocus" />
                        </div>
                        <div className={BrowseDetails.musicInfo}>
                            <h4 className={BrowseDetails.musicInfoHeader}>{elem.title}</h4>
                            <span className={BrowseDetails.iconAndDesc}>
                                <AiTwotoneHeart className={BrowseDetails.iconLike} />
                                <p className={BrowseDetails.musicInfoDescription}>657,234</p>
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    );
};
export default Post;