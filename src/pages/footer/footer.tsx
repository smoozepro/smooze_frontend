import React from "react";
import "./footer.css";
import { IoLogoTwitter, IoLogoInstagram } from "react-icons/io";
import { RiFacebookFill } from "react-icons/ri";
const Footer = () => {
	return (
		<>
			<div className="footer_main">
				<div className="footer-help">
					<div className="footer-SMOOZE">
						<p className="footer-title smooze">SMOOZE</p>
						<ul>
							<li>
								<a className="footer-link" href="#">
									About
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Premium
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Features
								</a>
							</li>
						</ul>
					</div>
					<div className="footer-communities">
						<p className="footer-title communities">COMMUNITIES</p>
						<ul>
							<li>
								<a className="footer-link" href="#">
									For Artists
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Developers
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Press
								</a>
							</li>
						</ul>
					</div>

					<div className="use-link">
						<p className="footer-title">USEFUL LINKS</p>
						<ul>
							<li>
								<a className="footer-link" href="#">
									Help
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Web Player
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Explore Channels
								</a>
							</li>
							<li>
								<a className="footer-link" href="#">
									Download App
								</a>
							</li>
						</ul>
					</div>

					<div className="footer-social">
						<ul>
							<li>
								<a href="#">
									<RiFacebookFill className="facebook-social icon-fo" />
								</a>
							</li>
							<li>
								<a href="#">
									<IoLogoTwitter className="twitter-social icon-fo" />
								</a>
							</li>
							<li>
								<a href="#">
									<IoLogoInstagram className="instagram-social icon-fo" />
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="last-footer">
					<div className="footer-bottom">
						<a href="">Legal</a>
						<a href="">Privacy</a>
						<a href="">Cookies</a>
						<a href="">Ads</a>
						<div></div>
					</div>
					<div className="footer-input">
						<span className="music">@ 2022 SMOOZE</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Footer;
