import React from "react";
import axios from 'axios'
import { useEffect,useState } from "react";
import AllUserArtists from "../../Components/BrowseDetails/Artists";
import PlayerBar from "../../Components/Playerbar/Playerbar";
import { getArtist } from "../../utils/api";
import { AiTwotoneHeart } from "react-icons/ai";
import playCover from "../../assets/playCover.png";
import { AiOutlineHeart, AiOutlinePlus, AiFillHeart } from "react-icons/ai";
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
import allArtist from "./Artists.module.css";
import { useParams } from "react-router-dom";
import { DataContext } from "../../useContext";
import {
	AllContext,
	AllPlayerContext,
	MusicContent,
} from "../../useContext/interface";
import { PlayerContext } from "../../useContext/PlayerBarContext";










function Artists() {


	const [artist, setArtist] = useState<any>([])
	let {artistId} = useParams()

	useEffect(() => {
		getArtist(`/api/artists/get-artist/${artistId}`).then((res:any)=>{
			console.log(res)
			setArtist(res.data.artist)

		})
	  }, []);
	return (
		<>

			<div className={allArtist.body}>

			<div className={allArtist.playlist}>
				<div className={allArtist.playlist__card}>
					<img src={artist.imageUrl} alt="playlist cover" />
					<div className={allArtist.playlist__info}>
						<h6>Artist</h6>
						<h3>{artist.name}</h3>
						<p>Golden age of rock. Cover: Led Zeppelin</p>
						<p>88 Songs, 9 hr 13 min</p>
					</div>
				</div>
				<div className={allArtist.playlist__click__section}>
					<div className={allArtist.playlist__click}>
						<button>Pause</button>
						<span>
							<AiOutlineHeart />
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
						placeholder="Playlist Search"
						className={allArtist.input}
					/>
				</form>
				<div className={allArtist.songs}>
					<h3>Playlist songs</h3>
					<FiChevronUp />
				</div>
			</div>

			<table>
				<tr className={allArtist.tableHead}>
					<th>#</th>
					<th className={allArtist.title}>TITLE</th>
					<th>ARTIST</th>
					<th>ALBUM</th>
					<th>TIME</th>
					<th></th>
				</tr>

				<tr className={allArtist.row}>
					<td>1</td>
					<td className={allArtist.titleRow}>
						<span>
							<img src={sam} alt="" />
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
					<td>2</td>
					<td className={allArtist.titleRow}>
						<span>
							<img src={sam} alt="" />
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
							<img src={sam} alt="" />
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
							<img src={sam} alt="" />
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
							<img src={sam} alt="" />
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
							<img src={sam} alt="" />
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
							<img src={sam} alt="" />
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
			</table>
			<div className={allArtist.featured}>
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
					{/* <div>
						<img src={RollingStones} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>The Rolling Stones</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} />
								593,164
							</p>
						</div>
					</div>
					<div>
						<img src={DeepPurple} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>Deep Purple</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} />
								241,224
							</p>
						</div>
					</div>
					<div>
						<img src={Beatles} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>The Beatles</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} />
								871,189
							</p>
						</div>
					</div>
					<div>
						<img src={Queen} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>Queen</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} /> 490,451
							</p>
						</div>
					</div>
					<div>
						<img src={Bowie} alt="" />
						<div className={allArtist.featuredImgText}>
							<h4>David Bowie</h4>
							<p>
								<AiFillHeart className={allArtist.featuredIcon} /> 490,451
							</p>
						</div>
					</div> */}
				</div>
			</div>
		</div>
		</>
	);
}
export default Artists;