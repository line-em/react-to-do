import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import { nanoid } from "nanoid";
import Warning from "./components/Warning";
import Todo from "./components/Todo";

export default function App() {
	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("");
	const [tab, setTab] = useState("today");
	const [todos, setTodos] = useState([
		{
			id: nanoid(),
			task: "Learn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn React",
			timestamp: "01-01",
			completed: false
		},
		{
			id: nanoid(),
			task: "Learn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn ReactLearn React",
			timestamp: "2020-01-01",
			completed: false
		},
		{
			id: nanoid(),
			task: "Learn React",
			timestamp: "2020-01-01",
			completed: false
		}
	]);

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
				<Warning message="Every task will be shown here." windowWidth={windowWidth} />
			) : (
				<>
					<section className="filter-buttons">
						<button className="action_button">Show All</button>
						<button className="action_button">Completed</button>
						<button className="action_button">Active</button>
					</section>
					<section className="renderedList">
						<ul className="flow">
							{todos.map((todo) => (
								<Todo
									id={todo.id}
									timestamp={todo.timestamp}
									message={todo.task}
									completed={todo.completed}
								/>
							))}
						</ul>
						<button className="action_button text-red clear-button">Clear All</button>
					</section>
				</>
			)}
		</main>
	);
}
// 	<div className="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>	<div className="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>
