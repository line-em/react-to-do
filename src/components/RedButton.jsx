import React from "react";

export default function RedButton(props) {
	return (
		<button className="action_button text-red clear-button" onClick={props.removeAll}>
			{props.text}
		</button>
	);
}
