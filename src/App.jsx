import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ThemeSwitch from "./components/ThemeSwitch";
import { nanoid } from "nanoid";
import Warning from "./components/Warning";
import Todo from "./components/Todo";
import Form from "./components/Form";
import Filters from "./components/Filters";
import RedButton from "./components/RedButton";

export default function App() {
	//Adjust icon sizing
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const handleWindowResize = () => setWindowWidth(window.innerWidth);

	const [headerTitle, setHeaderTitle] = useState("Today I will...");

	const [selectView, setSelectView] = useState("all");

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

	const editTodos = (currentTodo, newMessage, newTimestamp) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === currentTodo) {
					return {
						...todo,
						message: newMessage,
						timestamp: "Updated at " + newTimestamp
					};
				}
				return todo;
			})
		);
	};

	const completeTodos = (currentTodo) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === currentTodo) {
					return {
						...todo,
						completed: !todo.completed
					};
				}
				return todo;
			})
		);
	};

	const filterTodo = (view) => {
		const completedTodos = todos?.filter((todo) => todo.completed);
		const activeTodos = todos?.filter((todo) => !todo.completed);

		let targetView =
			view === "all" ? todos : view === "completed" ? completedTodos : activeTodos;

		const currentView = targetView.map((todo) => (
			<Todo
				id={todo.id}
				timestamp={todo.timestamp}
				message={todo.message}
				completed={todo.completed}
				removeTodos={removeTodos}
				editTodos={editTodos}
				completeTodos={completeTodos}
				key={todo.id}
			/>
		));

		return currentView;
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
					<Filters setSelectView={setSelectView} selectView={selectView} />
					<section className="renderedList">
						<ul className="flow" role="list">
							{filterTodo(selectView)}
						</ul>
						{todos.length >= 2 && <RedButton text="Clear All" removeAll={removeAll} />}
					</section>
				</>
			)}
		</main>
	);
}
