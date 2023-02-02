/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useRef, useContext } from "react";
import RecentCSS from "./recentlyPlayed.module.css";
import { AiTwotoneHeart } from "react-icons/ai";
import { Song } from "./song.dto";
import { DataContext } from "../../useContext/index";
import { PlayerContext } from "../../useContext/PlayerBarContext";

import { AllContext, AllPlayerContext } from "../../useContext/interface";

const Post = ({ post }: any) => {
	const { songs, addToPlaylist } = useContext(DataContext) as AllContext;
	const { handleSongPlay } = useContext(PlayerContext) as AllPlayerContext;
	const recentSongIds = post.map((item: any) => item.songId);
	const recentSongs = songs.filter((item: any) =>
		recentSongIds.includes(item.id)
	);

	return (
		<div className={RecentCSS.slide}>
			{post.map((song: any) => (
				<div key={song.id} className="list-group mb-3">
					{/* <img src={song.url} /> */}
					<div className={RecentCSS.pic}>
						<div className={RecentCSS.img_card}>
							<img
								src={song.MusicInstance.imageUrl}
								alt="playlist radio"
								onClick={() => handleSongPlay(recentSongs, song.songId)}
							/>
						</div>
						<div className={RecentCSS.img_text}>
							<h4>{song.MusicInstance.title} </h4>
							<div className={RecentCSS.love}>
								<p>{song.MusicInstance.artist} </p>
								<AiTwotoneHeart
									onClick={async () => await addToPlaylist(song.id)}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
export default Post;
