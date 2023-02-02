import React from "react";

const InputBox = (props: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required: boolean | undefined;
	type: string;
	placeholder: string;
	className: string;
	value: string;
	id: string;
	name?: string;
}) => {
	return (
		<input
			type={props.type}
			placeholder={props.placeholder}
			className={props.className}
			value={props.value}
			id={props.id}
			onChange={props.onChange}
			required={props.required}
			name={props.name}
		/>
	);
};

export default InputBox;
