import React from "react";
import "./Button.css";

type ButtonType = "submit" | "reset" | "button";

const Button = (props: {
	text: string;
	type: ButtonType;
	name: string;
	value: string;
}) => {
	return (
		<button
			className="submit"
			style={{ backgroundColor: "#2D9BEF" }}
			type={props.type}
			name={props.name}
			value={props.value}
		>
			{props.text}
		</button>
	);
};

export default Button;
