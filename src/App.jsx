import React, { useEffect, useState } from "react";
import Header from "./Header";
import ThemeSwitch from "./ThemeSwitch";
import { Lightbulb, Pencil, Trash, Clock } from "phosphor-react";

export default function App() {
	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("");
	const [tab, setTab] = useState("today");
	const [todos, setTodos] = useState([
		{ id: 1, task: "Learn React", timestamp: "2020-01-01", completed: false }
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
		<>
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
						<section className="filter-buttons">
							<button className="action_button">Show All</button>
							<button className="action_button">Completed</button>
							<button className="action_button">Active</button>
						</section>
						<section className="renderedList">
							<ul>
								{todos.map((todo) => (
									<li key={todo.id}>
										<label className="tasks" htmlFor={todo.id}>
											<input name={todo.id} type="checkbox" />
											{todo.task}
											<p className="time">
												<Clock size={18} weight="fill" />
												{todo.timestamp}
											</p>
										</label>

										<div>
											<abbr title="edit task">
												<Pencil size={18} weight="fill" />
												<span className="tooltip">Edit</span>
											</abbr>
											<abbr title="delete task">
												<Trash size={18} weight="fill" />
												<i
													className="ph-trash-fill jello deleteThis"
													id="delete${task.id}"
													alt="delete task"
												>
													x
												</i>
											</abbr>
										</div>
									</li>
								))}
							</ul>
							<button className="action_button text-red clear-button">
								Clear All
							</button>
						</section>
					</>
				)}
			</main>
		</>
	);
}
// 	<div className="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>	<div className="alerts alerts_style alert-danger" role="alert">
// 	<strong>Error!</strong> You must enter a task.
// </div>
