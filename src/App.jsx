import React, { useEffect, useState } from "react";
import Header from "./Header";
import ThemeSwitch from "./ThemeSwitch";
import { Lightbulb } from "phosphor-react";

export default function App() {
	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("");
	const [tab, setTab] = useState("today");
	const [todos, setTodos] = useState([{ id: 1, task: "Learn React" }]);

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
	}, []);

	// Window Listener
	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return (
		<main className="main_style">
			<ThemeSwitch />
			<Header headerTitle={headerTitle} windowWidth={windowWidth} />
			<section className="inputTasks">
				<input type="text" name="tasks" placeholder="Add a task" />
				<button>Add</button>
			</section>
			{todos?.length === 0 ? (
				<section className="alerts alerts_style" role="detail">
					<Lightbulb
						size={windowWidth < 768 ? 18 : 22}
						weight="fill"
						color="var(--redsalsa)"
					/>
					Every task will be shown here.
				</section>
			) : (
				<>
					<section className="renderedList">
						<ul>
							{todos.map((todo) => (
								<li key={todo.id}>
									<input type="checkbox" name="tasks" />
									{todo.task}
								</li>
							))}
						</ul>
					</section>
					<button className="clearAll">Clear All</button>
					<section className="filter-buttons">
						{" "}
						<button class="filter" id="show-all">
							Show All
						</button>
						<button class="filter" id="show-complete">
							Completed
						</button>
						<button class="filter" id="show-active">
							Active
						</button>
					</section>
				</>
			)}
		</main>
	);
}
// 	<div class="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>	<div class="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>
