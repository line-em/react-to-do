import React, { useState } from "react";
import Warning from "./Warning";

export default function Form(props) {
	const [writing, setWriting] = useState("");
	const [warning, setWarning] = useState(false);

	const handleSubmit = (e) => {
		if (writing === "" || writing === " ") {
			e.preventDefault();
			setWarning(true);
		} else {
			e.preventDefault();
			props.addTodos(writing);
			setWriting("");
			setWarning(false);
		}
	};

	return (
		<>
			<form className="add_tasks_form" onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					name="tasks"
					placeholder="Add a task..."
					onChange={(e) => setWriting(e.target.value)}
					value={writing}
				/>
				<button>Add</button>
			</form>
			{warning && <Warning message="Please enter a task" type="error" />}
		</>
	);
}
