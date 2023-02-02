import React, { FC } from "react";
import NavBarLogo from "../../../assets/NavBar-Logo.svg";
import styles from "./LogoutNavbar.module.css";
import { AuthButtonColored, AuthButtonTrans } from "../../Buttons/AuthButton";
import { TopText } from "../../Texts/TopText/TopText";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

interface LayoutProps {
	          	toggleLoginBtn: any;
}
const LogoutNavbar: FC<LayoutProps> = ({ toggleLoginBtn }) => {
	return (
		<nav>
			<div className={styles.navbarContainer}>
				<div className={styles.navSection}>
					<div className={styles.navLogo}>
						<Link to="/">
							<img className={styles.logoImg} src={NavBarLogo} alt="Navlogo" />
						</Link>
					</div>

					<div className={styles.topTextLeft}>
						<div>
							<TopText text="Download" link="/download" />
							<TopText text="Help" link="/help" />
						</div>
					</div>
				</div>

				<div className={styles.topTextLeftBtn}>
					<AuthButtonTrans
						text="Log in"
						link={""}
						handleAction={toggleLoginBtn}
					/>
					<AuthButtonColored
						text="Sign up"
						link={""}
						handleAction={toggleLoginBtn}
					/>

					<div className={styles.loginsmallscreen}>
						<FiLogIn
							color="#fff"
							className={styles.filogin}
							onClick={() => toggleLoginBtn("Log in")}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default LogoutNavbar;
