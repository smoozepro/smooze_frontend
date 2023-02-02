import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AllUserArtists from "../../Components/BrowseDetails/Artists";
import PlayerBar from "../../Components/Playerbar/Playerbar";
import { getArtist } from "../../utils/api";
import {
	AiTwotoneHeart,
	AiOutlineHeart,
	AiOutlinePlus,
	AiFillHeart,
} from "react-icons/ai";
import playCover from "../../assets/playCover.png";
import { SlOptions } from "react-icons/sl";
import { BiSearch } from "react-icons/bi";
import { FiChevronUp } from "react-icons/fi";
import RollingStones from "../../assets/RollingStones.png";
import LedZeppelin from "../../assets/LedZeppelin.png";
import Beatles from "../../assets/Beatles.png";
import DeepPurple from "../../assets/DeepPurple.png";
import Queen from "../../assets/Queen.png";
import sam from "../../assets/sam.png";
import Bowie from "../../assets/Bowie.png";
import allArtist from "../Playlist/Playlist.module.css";
import { useParams } from "react-router-dom";
import { AllContext, AllPlayerContext } from "../../useContext/interface";
import { DataContext } from "../../useContext";
import { PlayerContext } from "../../useContext/PlayerBarContext";

function SingleArtists() {
	//   const [artist, setArtist] = useState<any>([]);
	const { artist, songs } = useContext(DataContext) as AllContext;
	const { toggleShuffle, handleSongPlay } = useContext(PlayerContext) as AllPlayerContext;

	const [favorited, setFavorited] = useState(false);
	const { artistId } = useParams();
	const activeArtist = artist?.find((item) => item.id === artistId);
	const artistSongs = songs.filter((item) => item.artistId === artistId);
	console.log(artistId);
	return (
		<>
			<div className={allArtist.body}>
				<div className={allArtist.playlist}>
					<div className={allArtist.playlist__card}>
						<img
							width={"100%"}
							height={"100%"}
							src={activeArtist?.imageUrl}
							alt="playlist cover"
						/>

						<div className={allArtist.playlist__info}>
							<h6>Artist</h6>
							<h3>{activeArtist?.name}</h3>
							<p>
								<a href={activeArtist?.instagramUrl}>Instagram</a>
							</p>
							<p>
								<a href={activeArtist?.twitterUrl}>Twitter</a>
							</p>
							<p>{artistSongs.length} Songs</p>
						</div>
					</div>
					<div className={allArtist.playlist__click__section}>
						<div className={allArtist.playlist__click}>
							<button onClick={toggleShuffle}>SHUFFLE PLAY</button>
							<span>
								{!favorited ? (
									<AiOutlineHeart
										onClick={() => setFavorited(true)}
										color="red"
									/>
								) : (
									<AiFillHeart
										onClick={() => setFavorited(false)}
										color="red"
									/>
								)}
							</span>
							<span>
								<SlOptions />
							</span>
						</div>
						{/* <p>387,722 FOLOWERS</p> */}
					</div>
				</div>

				<div className={allArtist.search}>
					<form className={allArtist.search__form}>
						<span className={allArtist.search__icon}>
							<BiSearch />
						</span>
						<input
							type="text"
							placeholder="Popular songs"
							className={allArtist.input}
						/>
					</form>
					<div className={allArtist.songs}>
						<h3>Artist songs</h3>
						<FiChevronUp />
					</div>
				</div>
				<div className={allArtist.tableDiv}>
					<table>
						<tr className={allArtist.tableHead}>
							<th>#</th>
							<th>Img</th>
							<th className={allArtist.title}>TITLE</th>
							<th>ARTIST</th>
							<th>ALBUM</th>
							<th>TIME</th>
							<th></th>
						</tr>
						{artistSongs.length > 0 &&
							artistSongs.map((song, index) => (
								<tr key={song.id} className={allArtist.row} onClick={()=>handleSongPlay(artistSongs, song.id)}>
									<td>{index + 1}</td>
									<td>
										<span>
											<img src={song.imageUrl} alt="" />
										</span>
									</td>
									<td className={allArtist.titleRow}>
										{song.title}
									</td>
									<td>{song.artist}</td>
									<td>{""}</td>
									<td>{""}</td>
									<td className={allArtist.HeartPlus}>
										<span className={allArtist.heart}>
											<AiOutlineHeart />
										</span>
										<span className={allArtist.plus}>
											<AiOutlinePlus />
										</span>
									</td>
								</tr>
							))}
						{/* 
            <tr className={allArtist.row}>
              <td>2</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr>
            <tr className={allArtist.row}>
              <td>3</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr>

            <tr className={allArtist.row}>
              <td>4</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr>
            <tr className={allArtist.row}>
              <td>5</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr>
            <tr className={allArtist.row}>
              <td>6</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr>
            <tr className={allArtist.row}>
              <td>7</td>
              <td className={allArtist.titleRow}>
                <span>
                  <img src={sam} alt='' />
                </span>
                Fleetwood Mac
              </td>
              <td>Rhiannon</td>
              <td>Fleetwood Mac</td>
              <td>5.53</td>
              <td className={allArtist.HeartPlus}>
                <span className={allArtist.heart}>
                  <AiOutlineHeart />
                </span>
                <span className={allArtist.plus}>
                  <AiOutlinePlus />
                </span>
              </td>
            </tr> */}
					</table>
					{/* <div className={allArtist.featured}>
				<h3>Featured artists</h3>
				<div className={allArtist.featuredImg}>
					<div id={artist.id}>
						<img src={artist.imageUrl} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>{artist.name}</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} />
								343,722
							</p>
						</div>
					</div>
				</div>
			</div> */}
				</div>
			</div>
		</>
	);
}

export default SingleArtists;
