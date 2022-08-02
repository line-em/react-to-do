import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import { nanoid } from "nanoid";
import Warning from "./components/Warning";
import Todo from "./components/Todo";
import Form from "./components/Form";

export default function App() {
	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("Today I will...");
	const [tab, setTab] = useState("today");

	const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") || []));

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodos = (writing) => {
		setTodos([
			...todos,
			{
				id: nanoid(),
				message: writing,
				timestamp: new Date().toLocaleString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric"
				}),
				completed: false
			}
		]);
	};

	const removeTodos = (currentTodo) => {
		setTodos(todos.filter((todo) => currentTodo !== todo.id));
	};

	const removeAll = () => {
		setTodos([]);
	};

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
			<Form addTodos={addTodos} />
			{todos?.length === 0 ? (
				<Warning
					type="info"
					message="Every task will be shown here."
					windowWidth={windowWidth}
				/>
			) : (
				<>
					<section className="filter-buttons">
						<button className="action_button">Show All</button>
						<button className="action_button">Completed</button>
						<button className="action_button">Active</button>
					</section>
					<section className="renderedList">
						<ul className="flow" role="list">
							{todos.map((todo) => (
								<Todo
									id={todo.id}
									timestamp={todo.timestamp}
									message={todo.message}
									completed={todo.completed}
									removeTodos={removeTodos}
									key={todo.id}
								/>
							))}
						</ul>
						{todos.length >= 2 ? (
							<button
								className="action_button text-red clear-button"
								onClick={removeAll}
							>
								Clear All
							</button>
						) : (
							""
						)}
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

// Things to do on refresh
// useEffect(() => {
// 	switchTabs("today");
// }, []);

// const switchTabs = (tab) => {
// 	switch (tab) {
// 		case "today":
// 			setHeaderTitle("Today I will...");
// 			setTab("today");
// 			break;
// 		case "completed":
// 			setHeaderTitle("Previously, I did...");
// 			setTab("completed");
// 			break;
// 		case "all":
// 			setHeaderTitle("All my tasks...");
// 			setTab("all");
// 			break;
// 		default:
// 			setHeaderTitle("My todos...");
// 			setTab("todos");
// 			break;
// 	}
// };
