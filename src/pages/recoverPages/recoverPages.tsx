import React from "react";
import "./forgotPassword.css";

const Recover = () => {
	return (
		<React.Fragment>
			<header>
				<h1>Forgot Password</h1>
			</header>
			<main>
				<p>Email</p>
				<input type="email" placeholder="example@gmail.com" />
				<button>RecoverPassword</button>
			</main>
		</React.Fragment>
	);
};

export default Recover;
