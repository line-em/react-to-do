import React from "react";

export default function Warning(props) {
	return (
		<section className="alerts alerts_style" role="detail">
			<Lightbulb size={windowWidth < 768 ? 18 : 22} weight="fill" color="var(--redsalsa)" />
			{props.message}
		</section>
	);
}
