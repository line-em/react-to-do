import React, { useEffect, useState } from "react";
import Header from "./Header";
import ThemeSwitch from "./ThemeSwitch";
import { Lightbulb } from "phosphor-react";

export default function App() {
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

	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("");
	const [tab, setTab] = useState("today");
	const [todos, setTodos] = useState([]);

	const switchTabs = (tab) => {
		switch (tab) {
			case "today":
				setHeaderTitle("Today I will...");
				setTab("today");
				break;
			case "completed":
				setHeaderTitle("Previously, I did...");
				setTab("completed");
				break;
			case "all":
				setHeaderTitle("All my tasks...");
				setTab("all");
				break;
			default:
				setHeaderTitle("My todos...");
				setTab("todos");
				break;
		}
	};

	// Things to do on refresh
	useEffect(() => {
		switchTabs("today");
		document.querySelector("html").setAttribute("data-theme", theme);
	}, []);

	// Window Listener
	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	const alertMessages = () => {
		if (todos.length === 0) {
			return (
				<section className="alerts alerts_style" role="detail">
					<Lightbulb
						size={windowWidth < 768 ? 18 : 22}
						weight="fill"
						color="var(--redsalsa)"
					/>
					Every task will be shown here.
				</section>
			);
		} else if (error) {
			return (
				<div class="alerts alerts_style alert-danger" role="alert">
					<strong>Error!</strong> You must enter a task.
				</div>
			);
		}
	};

	return (
		<div className="wrapper">
			<main className="main_style">
				<ThemeSwitch toggleTheme={toggleTheme} theme={theme} />
				<Header headerTitle={headerTitle} windowWidth={windowWidth} />
				<section className="inputTasks">
					<input type="text" name="tasks" placeholder="Add a task" />
					<button>Add</button>
				</section>
				{alertMessages()}
			</main>
		</div>
	);
}
