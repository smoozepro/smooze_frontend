/* eslint-disable prettier/prettier */
import React from "react";
import "./Premium.css";
import offline from "../../assets/Offline.png";
import noAds from "../../assets/NoAds.png";
import { MdOutlineHighQuality } from "react-icons/md";
import { BsFillSkipEndFill } from "react-icons/bs";
import { IoIosCheckmark } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Premium = ({handleAction}:{handleAction?:Function}) => {
	const navigate = useNavigate()
	const handleClick = (e:React.MouseEvent)=>{
		e.preventDefault()
		if(handleAction){
		handleAction();
		toast.warning("Kindly login.")
		return;
	}
		navigate('/payment')
	}
	return (
		<div className="premium">
			<div className="premium_container">
				<h2>Why go Premium?</h2>
				<div className="premium_list">
					<div className="premium_section">
						<div className="premium_img_container">
							<img src={offline} alt="" />
						</div>
						<div className="premium_section_text">
							<h3>Offline Mode</h3>
							<p className="sub">Save and listen anywhere</p>
						</div>
					</div>

					<div className="premium_section">
						<div className="premium_img_container">
							<MdOutlineHighQuality className="premiumImg" />
						</div>

						<div className="premium_section_text">
							<h3>High quality Mode</h3>
							<p className="sub">Enjoy the full range of sound</p>
						</div>
					</div>

					<div className="premium_section">
						<div className="premium_img_container">
							<img src={noAds} alt="" />
						</div>
						<div className="premium_section_text">
							<h3>No ads</h3>
							<p className="sub">Enjoy nonstop music</p>
						</div>
					</div>

					<div className="premium_section">
						<div className="premium_img_container">
							<BsFillSkipEndFill className="premiumImg" />
						</div>
						<div className="premium_section_text">
							<h3>Unlimited Skips</h3>
							<p className="sub">Just tap skip</p>
						</div>
					</div>
				</div>
			</div>
			<div className="subscribe_container">
				<p>Listen free or subscribe to Smooze Premium</p>
				<div className="subscribe_section">
					<div>
						<div className="subscribe_section_free">
							<span className="free-title">Smooze Free</span> <br />
							<span className="free-title">
								<strong>N0.00</strong>/month
							</span>
							<ul>
								<li className="free-text">
									<IoIosCheckmark className="free-icon" />
									Online listening
								</li>
								<li className="free-text1">
									<IoIosCheckmark className="free-icon" />
									Regular Audio
								</li>
								<li className="free-text2">
									<IoIosCheckmark className="free-icon" />
									With Advertising
								</li>
								<li className="free-text1">
									<IoIosCheckmark className="free-icon" />
									30 skips per day
								</li>
							</ul>
						</div>
						<div className="musicbox_premium">
							<button className="musicbox_premium_b1" onClick={handleClick}>
							<Link to={''}>GET SMOOZE FREE </Link>
							</button>
						</div>
					</div>
					<div>
						<div className="subscribe_section_premium">
							<span className="prem-title">Smooze Premium</span>
							<br />
							<span className="prem-title">
								<a href="#" className="price-colored">
									N1500
								</a>
								/month
							</span>{" "}
							<br />
							<span className="prem-title" id="prem-title-sub">
								Start with one month free trial*
							</span>
							<ul>
								<li className="prem-text">
									<IoIosCheckmark className="premium-icon" />
									Offline Mode
								</li>
								<li className="prem-text1">
									<IoIosCheckmark className="premium-icon" />
									High quality audio
								</li>
								<li className="prem-text2">
									<IoIosCheckmark className="premium-icon" />
									No ads
								</li>
								<li className="prem-text3">
									<IoIosCheckmark className="premium-icon" />
									Unlimited Skips
								</li>
							</ul>
						</div>
						<div className="musicbox_premium">
							<button className="musicbox_premium_b2" onClick={handleClick}>
							<Link to={''}>GET SMOOZE PREMIUM</Link>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Premium;
