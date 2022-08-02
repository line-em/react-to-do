import React from "react";
import { Lightbulb, WarningCircle } from "phosphor-react";

export default function Warning(props) {
	const icon = (type) => {
		switch (type) {
			case "info":
				return <Lightbulb size={18} weight="fill" />;
			case "error":
				return <WarningCircle size={18} weight="fill" />;
			default:
				return <Lightbulb size={18} weight="fill" />;
		}
	};

	return (
		<section className="alerts alerts_style text-red" role="detail">
			{icon(props.type)}
			{props.message}
		</section>
	);
}
