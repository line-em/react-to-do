import React from "react";
import { MoonStars, Sun } from "phosphor-react";

export default function ThemeSwitch(props) {
	const [active, setActive] = React.useState(false);

	const tooltipStyle = {
		display: active ? "block" : "none"
	};

	return (
		<nav>
			<button
				className="iconNight"
				onClick={props.toggleTheme}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(false)}
			>
				{props.theme === "light" ? (
					<Sun weight="fill" size={24} />
				) : (
					<MoonStars weight="fill" size={24} />
				)}
				<figcaption style={tooltipStyle} className="tooltip tooltip_style">
					{props.theme} Theme
				</figcaption>
			</button>
		</nav>
	);
}
