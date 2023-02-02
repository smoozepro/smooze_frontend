import syles from "./AuthButton.module.css";

export const AuthButtonTrans = (props: {
	handleAction: any;
	link: string;
	text: string;
}) => {
	return (
		<button
			className={syles.authbuttontrans}
			type="button"
			onClick={() => props.handleAction(props.text)}
			name={props.text}
			value={props.text}
		>
			{props.text}
		</button>
	);
};
export const AuthButtonHome = (props: {
	handleAction: any;
	link: string;
	text: string;
}) => {
	return (
		<button
			// className={syles.authbuttontrans}
			type="button"
			onClick={() => props.handleAction()}
			name={props.text}
			value={props.text}
		>
			{props.text}
		</button>
	);
};

export const AuthButtonColored = (props: {
	handleAction: any;
	link: string;
	text: string;
}) => {
	return (
		<button
			className={syles.authbuttoncolored}
			type="button"
			onClick={() => props.handleAction(props.text)}
			name={props.text}
			value={props.text}
		>
			{props.text}
		</button>
	);
};

// export default AuthButtonTrans;
