import React, { useEffect, useState } from "react";
import { MoonStars, Sun } from "phosphor-react";

export default function ThemeSwitch() {
	//Tooltip
	const [active, setActive] = React.useState(false);
	const tooltipStyle = {
		display: active ? "block" : "none"
	};

	// Theming
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ||
			(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
	);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.querySelector("html").setAttribute("data-theme", newTheme);
	};

	useEffect(() => {
		document.querySelector("html").setAttribute("data-theme", theme);
	}, []);

	return (
		<nav>
			<button
				className="iconNight"
				onClick={toggleTheme}
				onMouseEnter={() => setActive(true)}
				onMouseLeave={() => setActive(false)}
			>
				{theme === "light" ? (
					<Sun weight="fill" size={24} />
				) : (
					<MoonStars weight="fill" size={24} />
				)}
				<figcaption style={tooltipStyle} className="tooltip tooltip_style">
					{theme} Theme
				</figcaption>
			</button>
		</nav>
	);
}
