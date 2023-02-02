import React from "react";
import Newrelease from "../../pages/new-release/Newrelease.module.css";
import lemonade from "../../assets/new-release/lemonade.png";
import lizzo from "../../assets/new-release/lizzo.png";
import honk from "../../assets/new-release/honk.png";
import lostplanet from "../../assets/new-release/lost planet.png";
import ghetto from "../../assets/new-release/ghettobaby.png";
import Notwaving from "../../assets/new-release/no-waving.png";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Playerbar from "../../Components/Playerbar/Playerbar";
import Podcasts from "../../Components/Browse/Podcast";
// import Pdcategory from "../../Components/PODCAST/pCCategorypage";

function Podcast() {
	return (
		<div>
			<div style={{ padding: "5% 15%" }}>
				<div>
					<div className={Newrelease.title}>
						<div className={Newrelease.playlist}>My podcasts</div>
						<div className={Newrelease.playlist2}>
							<AiOutlineLeft />
							<AiOutlineRight />
						</div>
					</div>

					<Podcasts />

					{/* <div className={Newrelease.musicContainer}>
						<div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={lemonade} alt="lemonade" />
								<div className={Newrelease.description}>Lemonade</div>
								<div className={Newrelease.artists}>Beyonce</div>
							</div>
						</div> */}

					{/* <div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={lizzo} alt="lizzo" />
								<div className={Newrelease.description}>Cuz I luv you</div>
								<div className={Newrelease.artists}>Lizzo</div>
							</div>
						</div>
						<div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={honk} alt="honk" />
								<div className={Newrelease.description}>Honk(Deluxe)</div>
								<div className={Newrelease.artists}>The Rolling Stones</div>
							</div>
						</div>
						<div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={lostplanet} alt="lostplanet" />
								<div className={Newrelease.description}>Lost Planet</div>
								<div className={Newrelease.artists}>SmokePurpp</div>
							</div>
						</div>
						<div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={ghetto} alt="ghetto" />
								<div className={Newrelease.description}>GhettoBaby</div>
								<div className={Newrelease.artists}>Kevin Abstract</div>
							</div>
						</div>
						<div className={Newrelease.music}>
							<div className={Newrelease.musicImg}>
								<img src={Notwaving} alt="Notwaving" />
								<div className={Newrelease.description}>
									Not Waving, But Drowning
								</div>
								<div className={Newrelease.artists}> Loyle Carner </div>
							</div>
						</div> */}
				</div>
			</div>
		</div>
	);
}

export default Podcast;
