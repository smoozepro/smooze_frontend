
import React, { useContext, useEffect, useState } from "react";

import { AiTwotoneHeart } from "react-icons/ai";
import BrowseDetails from "./styles/BrowseDetails.module.css";
import Queen from "./asset/Queen.png";
import { Link } from "react-router-dom";
import { AllContext, ArtistAttributes } from "../../useContext/interface";
import { DataContext } from "../../useContext";

function Popular({ from }: { from?: string }) {


	let { artist, addToPlaylist } = useContext(DataContext) as AllContext;
	if (window.location.pathname === "/user-dashboard") {
		artist = artist.slice(0, 6);
	}
	return (
			<div className={BrowseDetails.artistContainer}>
				{artist.map((elem: ArtistAttributes) => (
					<Link to={`/artist/${elem.id}`} key={elem.id} className={BrowseDetails.artisteLink}>
						<div className={BrowseDetails.music}>
							<div className={BrowseDetails.artistImg}>
								<img src={elem.imageUrl || Queen} alt="artistImage" />
							</div>
							<div className={BrowseDetails.artistInfo}>
								<h4 className={BrowseDetails.musicInfoHeader}>{elem.name}</h4>
								<span className={BrowseDetails.iconAndDesc}>
									<AiTwotoneHeart
										className={BrowseDetails.iconLike}
										onClick={async () => await addToPlaylist(elem.id)}
									/>
									<p className={BrowseDetails.musicInfoDescription}>657,234</p>
								</span>
							</div>
						</div>
					</Link>
				))}


				{/* <div className={BrowseDetails.music}>

					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="ProductiveMorning" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>
							Productive Morning
						</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>257,634</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={Queen} alt="WhiteNoise" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>White Noise</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>757,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="Nature" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Nature</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>157,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={Queen} alt="BrainFood" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Brain Food</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>357,234</p>
						</span>
					</div>
				</div>
				<div className={BrowseDetails.music}>
					<div className={BrowseDetails.artistImg}>
						<img src={newrelease} alt="MorningRush" />
					</div>
					<div className={BrowseDetails.artistInfo}>
						<h4 className={BrowseDetails.musicInfoHeader}>Morning Rush</h4>
						<span className={BrowseDetails.iconAndDesc}>
							<AiTwotoneHeart className={BrowseDetails.iconLike} />
							<p className={BrowseDetails.musicInfoDescription}>607,554</p>
						</span>
					</div>
				</div>
				</div> */}


			</div>
	);

}
export default Popular;
