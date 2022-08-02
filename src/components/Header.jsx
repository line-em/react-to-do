import React from "react";
import { Notepad } from "phosphor-react";

export default function Header(props) {
	return (
		<header>
			<Notepad
				size={props.windowWidth < 768 ? 48 : 60}
				weight="fill"
				color="var(--mirtilo)"
				style={{ marginInlineEnd: "var(--tiny-value" }}
			/>{" "}
			<h1>{props.headerTitle}</h1>
		</header>
	);
}
