import React, { useState, useEffect, useContext, useRef } from "react";
// import { AiTwotoneHeart } from "react-icons/ai";
import BrowseDetails from "./styles/BrowseDetails.module.css";
// import DeepFocus from "./asset/GLAM ROCK.png";
// import NatureLarge from "./asset/WORKOUT rock.png";
import { apiGet } from "../../utils/api/axios";
import {
	AllContext, AllPlayerContext, MusicContent,
} from "../../useContext/interface";
import { DataContext } from "../../useContext";
import { PlayerContext } from "../../useContext/PlayerBarContext";

function Popular({ id }: { id: string | undefined }) {
	const { genres } = useContext(DataContext) as AllContext;
	const {handleSongPlay} = useContext(PlayerContext) as AllPlayerContext
	const [genre, setGenre] = useState<any>(null);
	const [genreSongs, setGenreSongs] = useState<MusicContent[]|null>(null)
	// const { artist } = useContext(DataContext) as AllContext;

  useEffect(() => {
    const getGenre = async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await apiGet(`/api/genre/genre/${id}`)
        .then((res) => {
          setGenre(res.data.genre);
          console.log(res.data.genre);
		  const genreSongs = res.data.genre.music;
		  setGenreSongs(genreSongs)
        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getGenre();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className={BrowseDetails.musicContainer}>
        {genres.length > 0 &&
          genre !== null &&
          genre.music.length > 0 &&
          genre.music.map((item: any, index: number) => {
			// console.log(item)
            return (

              <div className={BrowseDetails.music} key={item.id} onClick={()=>handleSongPlay(genreSongs, item.id)}>
                <div className={BrowseDetails.musicImg}>
                  <img src={item.imageUrl} alt='deepFocus' />
                  {/* console.log("image:" item.imageUrl) */}
                </div>
                <div className={BrowseDetails.musicInfo}>
                  <h4 className={BrowseDetails.musicInfoHeader}>
                    {item.title}
                  </h4>
                  <h4 className={BrowseDetails.musicInfoHeader}>
                    Artist: {item.artist}
                  </h4>
                  <span className={BrowseDetails.iconAndDesc}>
                    {/* <AiTwotoneHeart className={BrowseDetails.iconLike} />
	
										<p className={BrowseDetails.musicInfoDescription}>
											657,234
										</p> */}
									</span>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default Popular;
