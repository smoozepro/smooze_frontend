import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import resetcss from "./Rset.module.css";
import config from "../../utils/config/config";

const ResetPasswordPage = () => {
	const searchParams = new URLSearchParams(document.location.search);
	const token = searchParams.get("token");

	const navigate = useNavigate();

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	if (token === undefined) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "password") {
			setPassword(e.target.value);
		} else if (e.target.name === "confirmPassword") {
			setConfirmPassword(e.target.value);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
			} else {
				// send email to the route
				await axios
					.post(`${config.VITE_SERVER_URL}/api/user/changepassword`, {
						password,
						token,
					})
					.then((res) => {
						toast.success(res.data.message);
						navigate("/");
					});
			}
		} catch (err: any) {
			if (err.message === "Network Error") {
				return toast("Network error");
			}
			toast(err.response.data.error);
			//   navigate("/");
		}
	};

	return (
		<Fragment>
			<main>
				<>
					<span className={resetcss.container}>
						<div className={resetcss.form_container}>
							<span className={resetcss.text}>Reset Your Password ! </span>
						</div>
						<div className={resetcss.custom_control2_input}>
							<input
								className={resetcss.custom_control2_input}
								type="password"
								id="oldPassword"
								placeholder="Enter Old Password"
								name="oldPassword"
								//   onChange={(e) => handleChange(e)}
								required
							/>
						</div>
						<div>
							<input
								type="password"
								id="password"
								className={resetcss.custom_control2_input}
								placeholder="Enter New Password"
								name="newPassword"
								onChange={(e) => handleChange(e)}
								required
							/>
						</div>
						<span className={resetcss.login_remember_container}>
							<span
								onClick={async (e) => await handleSubmit(e)}
								className={resetcss.onSubmitBtn}
							>
								Change Password
							</span>
						</span>

						<span
							className={resetcss.text}
							// onClick={props.openForgotModal}
						>
							Access The World of Smooze !!
						</span>
					</span>
				</>
			</main>
		</Fragment>
	);
};

export default ResetPasswordPage;
