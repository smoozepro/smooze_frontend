import React from "react";
import "./TopText.css";
import { Link } from "react-router-dom";

export const TopText = (props: { link: string; text: string }) => {
	return (
		<Link to={props.link}>
			<p className="top-text">{props.text}</p>
		</Link>
	);
};
