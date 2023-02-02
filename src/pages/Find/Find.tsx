import React from "react";
import "./Find.css";
import Find_Img from "../../assets/Find_Img.png";

const Find = () => {
	return (
		<div className="find">
			<div className="find-text">
				<h2 className="h2">Find the music you want</h2>
				<p className="p">
					Search for your favorite songs using the description,
					<br /> or turn on the
					<a href="" className="musicfinder">
						{" "}
						MusicFinder
					</a>{" "}
					feature to find the song <br /> that is playing near you.
				</p>
			</div>
			<img className="img" src={Find_Img} alt="Find img" />
		</div>
	);
};

export default Find;
