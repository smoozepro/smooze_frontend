import React from "react";
import { Link } from "react-router-dom";
import Artists from "../../Components/BrowseDetails/Artists";
import BrowseDetailcss from "../BrowseDetails/BrowseDetails.module.css";

const AllArtists = () => {
	return (
		<>
			<div className={BrowseDetailcss.container}>
				<div className={BrowseDetailcss.container}>
					<div id={"ARTISTS"} className={BrowseDetailcss.header}>
						<span className={BrowseDetailcss.header}>Artists</span>
						<Link to={"/artist"}>
							{" "}
							<span className={BrowseDetailcss.Browseviewall}>VIEW ALL</span>
						</Link>
					</div>
					<Artists />
				</div>
			</div>
		</>
	);
};

export default AllArtists;
