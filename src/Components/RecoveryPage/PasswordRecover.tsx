import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "./button";
import CloseIcon from "@mui/icons-material/Close";
import "./PasswordRecover.css";
import { apiPostNoAuth } from "../../utils/api/axios";
import InputBox from "../Input/InputBox/InputBox";
import "react-toastify/dist/ReactToastify.css";

const PasswordRecover = () => {
	const [email, setEmail] = useState("");
	const [showRecoverPwd, setShowRecoverPwd] = useState("show");

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleClose = () => {
		setShowRecoverPwd("none");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// send email to the route
			const response = await apiPostNoAuth("/api/user/forgot-password", {
				email,
			});
			if (response.status === 200) {
				toast.success("email sent");
			} else {
				toast.error("email not sent");
			}
		} catch (error) {
			toast.error("could not send reset email");
		}
	};

	return (
		<div className="pageContainer" style={{ display: showRecoverPwd }}>
			<CloseIcon className="close" onClick={handleClose} />
			<header>
				<h1 className="pageHeader">Forgot password?</h1>
			</header>
			<main>
				{/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
				<form onSubmit={handleSubmit}>
					<InputBox
						required={true}
						type="email"
						placeholder="email"
						className="emailInput"
						value={email}
						id="email"
						onChange={onChange}
						name="email"
					/>

					<Button
						type="submit"
						value="submit"
						name="submit"
						text="GET RESET PASSWORD LINK"
					/>
				</form>
			</main>
		</div>
	);
};

export default PasswordRecover;
