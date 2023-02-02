/* eslint-disable array-callback-return */
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import PlayStyle from "./Playlist.module.css";
import { useRecentlyPlayed } from "../../Hooks/RecentlyPlayed";
import { useContext, useRef } from "react";
import {
	AllContext,
	MusicContent,
	AllPlayerContext,
} from "../../useContext/interface";
import { DataContext } from "../../useContext";
import { PlayerContext } from "../../useContext/PlayerBarContext";

const Post = (props: any) => {

	const { playlist } = useContext(DataContext) as AllContext;
	const { handleSongPlay } = useContext(
		PlayerContext
	) as AllPlayerContext;

	const { addToRecentlyPlayed } = useRecentlyPlayed();
	return (
		<div style={{overflowX:"auto"}}>
			<table>
				<tr className={PlayStyle.tableHead}>
					<th>#</th>
					<th className={PlayStyle.title}>TITLE</th>
					<th>ARTIST</th>
					{/* <th>ALBUM</th> */}
					<th>TIME</th>
					<th></th>
				</tr>
					{playlist.length > 0 &&
						playlist.map((elem: MusicContent, index: number) => (
							// eslint-disable-next-line @typescript-eslint/no-misused-promises
							<tr
								key={elem.id}
								// eslint-disable-next-line @typescript-eslint/no-misused-promises
								onClick={async () => await addToRecentlyPlayed(elem.id)}
								className={PlayStyle.row}
							>
								<td>{index}</td>
								<td
									className={PlayStyle.titleRow}
									// eslint-disable-next-line react/jsx-no-duplicate-props, @typescript-eslint/no-misused-promises
									onClick={async () => handleSongPlay(playlist, elem.id)}
								>
									<span>
										<img src={elem.imageUrl} alt="" />
									</span>
									<p className={PlayStyle.titleRowPara}>{elem.title}</p>
								</td>
								<td>{elem.artist}</td>
								{/* <td>{elem.album}</td> */}
								<td>{elem.song_duration}</td>
								<td className={PlayStyle.HeartPlus}>
									<span className={PlayStyle.heart}>
										<AiOutlineHeart />
									</span>
									<span className={PlayStyle.plus}>
										<AiOutlinePlus />
									</span>
								</td>
							</tr>
						))}
			</table>
		</div>
	);

};
export default Post;
