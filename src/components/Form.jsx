import React, { useState } from "react";

export default function Form(props) {
	const [writing, setWriting] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addTodos(writing);
		setWriting("");
	};

	return (
		<form className="inputTasks" onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				name="tasks"
				placeholder="Add a task..."
				onChange={(e) => setWriting(e.target.value)}
				value={writing}
			/>
			<button>Add</button>
		</form>
	);
}
