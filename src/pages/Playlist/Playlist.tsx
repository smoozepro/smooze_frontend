/* eslint-disable array-callback-return */
// import React, { useEffect, useState } from "react";
// import LoginNavbar from "../../Components/Navbar/LoginNavbar/LoginNavbar";
import playCover from "../../assets/playCover.png";
// import Bowie from "../../assets/Bowie.png";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";
import PlayStyle from "./Playlist.module.css";
import { BiSearch } from "react-icons/bi";
import { FiChevronUp } from "react-icons/fi";
// import RollingStones from "../../assets/RollingStones.png";
// import LedZeppelin from "../../assets/LedZeppelin.png";
// import Beatles from "../../assets/Beatles.png";
// import DeepPurple from "../../assets/DeepPurple.png";
// import Queen from "../../assets/Queen.png";
// import sam from "../../assets/sam.png";
// import { apiGet } from "../../utils/api";
// import { toast } from "react-toastify";
import Post from "./post";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../useContext";
import {
	AllContext,
	AllPlayerContext,
	ArtistAttributes,
	MusicContent,
	// MusicContent,
	// MusicContent,
} from "../../useContext/interface";
import { PlayerContext } from "../../useContext/PlayerBarContext";

const Playlist = () => {
	const [currentPlaylistSong, setCurrentPlaylistSong] = useState<MusicContent>({
		id: "",
		title: "",
		artistId: "",
		artist: "",
		genreId: "",
		imageUrl: "",
		songUrl: "",
		song_duration: "",
	});
	const { playlist, artist } = useContext(DataContext) as AllContext;

	const { togglePlay, isPlaying, songObj } = useContext(
		PlayerContext
	) as AllPlayerContext;

	useEffect(() => {
		const currentPlaylistObj =
			playlist.find((item) => item.id === songObj.id) !== undefined
				? songObj
				: playlist[0];
		setCurrentPlaylistSong(currentPlaylistObj);
	}, [songObj, playlist]);
	// setArtistIds(artist.map((SingleArtist: ArtistAttributes) => singleArtist.id));
	const artistIds = playlist.map((singleArtist) => singleArtist.artistId);

	return (
		<div className={PlayStyle.body}>
			<div className={PlayStyle.playlist}>
				<div className={PlayStyle.playlist__card}>
					<img src={currentPlaylistSong.imageUrl} alt="playlist cover" />
					<div className={PlayStyle.playlist__info}>
						<h6>Playlist</h6>
						<h3>{currentPlaylistSong.title}</h3>
						<p>{playlist.length} Songs</p>
					</div>
				</div>
				<div className={PlayStyle.playlist__click__section}>
					<div className={PlayStyle.playlist__click}>
						<button
							onClick={() => {
								togglePlay();
							}}
						>
							{isPlaying ? "Pause" : "Play"}
						</button>
					</div>
					<p>387,722 FOLOWERS</p>
				</div>
			</div>
			<div className={PlayStyle.search}>
				<form className={PlayStyle.search__form}>
					<span className={PlayStyle.search__icon}>
						<BiSearch />
					</span>
					<input
						type="text"
						placeholder="Playlist Search"
						className={PlayStyle.input}
					/>
				</form>
				<div className={PlayStyle.songs}>
					<h3>Playlist songs</h3>
					<FiChevronUp />
				</div>
			</div>
			<Post playlist={playlist} />

			<div className={PlayStyle.featured}>
				<h3>Featured artists</h3>
				<div className={PlayStyle.featuredRow}>
					{artist.map(
						(elem: ArtistAttributes) =>
							artistIds.includes(elem.id) && (
								<div className={PlayStyle.featuredImg} key={elem.id}>
									<div>
										<img src={elem.imageUrl} alt="" />
										<div className={PlayStyle.featuredImgText}>
											<h4>{elem.name}</h4>
											<p>
												<AiFillHeart className={PlayStyle.featuredIcon} />
												343,722
											</p>
										</div>
									</div>
								</div>
							)
					)}
				</div>
			</div>

			{/* <div>
						<img src={RollingStones} alt="" />
						<div className={PlayStyle.featuredImgText}>
							<h4>The Rolling Stones</h4>
							<p>
								<AiFillHeart className={PlayStyle.featuredIcon} />
								593,164
							</p>
						</div>
					</div>
					<div>
						<img src={DeepPurple} alt="" />
						<div className={PlayStyle.featuredImgText}>
							<h4>Deep Purple</h4>
							<p>
								<AiFillHeart className={PlayStyle.featuredIcon} />
								241,224
							</p>
						</div>
					</div>
					<div>
						<img src={Beatles} alt="" />
						<div className={PlayStyle.featuredImgText}>
							<h4>The Beatles</h4>
							<p>
								<AiFillHeart className={PlayStyle.featuredIcon} />
								871,189
							</p>
						</div>
					</div>
					<div>
						<img src={Queen} alt="" />
						<div className={PlayStyle.featuredImgText}>
							<h4>Queen</h4>
							<p>
								<AiFillHeart className={PlayStyle.featuredIcon} /> 490,451
							</p>
						</div>
					</div>
					<div>
						<img src={Bowie} alt="" />
						<div className={PlayStyle.featuredImgText}>
							<h4>David Bowie</h4>
							<p>
								<AiFillHeart className={PlayStyle.featuredIcon} /> 490,451
							</p>
						</div>
					</div> */}
			{/* </div> */}
		</div>
	);
};
export default Playlist;
