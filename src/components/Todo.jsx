import React, { useState } from "react";
import { Pen, Trash, Clock } from "phosphor-react";
import Warning from "./Warning.jsx";

export default function Todo(props) {
	const [newMessage, setNewMessage] = useState("");
	const [newTimestamp, setNewTimestamp] = useState("");
	const [isEditing, setIsEditing] = useState(false);
	const [warning, setWarning] = useState(false);

	// edit todo text
	const handleEdit = (e) => {
		setNewMessage(e.target.value);
		setNewTimestamp(
			new Date().toLocaleString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
				year: "numeric",
				hour: "numeric",
				minute: "numeric",
				second: "numeric"
			})
		);
	};

	// save todo text
	const handleSave = (e) => {
		if (newMessage === "" || newMessage === " ") {
			e.preventDefault();
			setWarning(true);
		} else {
			e.preventDefault();

			props.editTodos(props.id, newMessage, newTimestamp);
			setNewMessage("");
			setIsEditing(false);
			setWarning(false);
		}
	};

	// completed style
	const completedStyle = {
		textDecoration: props.completed ? "line-through" : "none",
		opacity: props.completed ? 0.7 : 1
	};

	// different views
	const editView = (
		<li className="edit edit_style task_style">
			<h5>Edit Todo:</h5>

			<form className="edit_form" onSubmit={(e) => handleSave(e)}>
				<input
					type="text"
					name="tasks"
					placeholder={props.message}
					onChange={(e) => handleEdit(e)}
					value={newMessage}
				/>
				<button className="action_button text-red">Save</button>
				<button className="action_button" onClick={() => setIsEditing(!isEditing)}>
					Cancel
				</button>
			</form>
			{warning && <Warning message="Please enter a task" type="error" />}
		</li>
	);
	const defaultView = (
		<li className="tasks task_style">
			<label htmlFor={`${props.id}-task`}>
				<input
					name={`${props.id}-task`}
					type="checkbox"
					id={`${props.id}-task`}
					onClick={() => props.completeTodos(props.id)}
					checked={props.completed}
				/>
				<span style={completedStyle}>{props.message}</span>
			</label>

			<div className="task-actions" onClick={() => setIsEditing(!isEditing)}>
				<abbr title="edit task">
					<Pen size={18} weight="fill" />
				</abbr>
				<abbr title="delete task" onClick={() => props.removeTodos(props.id)}>
					<Trash size={18} weight="fill" />
				</abbr>
			</div>
			<span className="time">
				<Clock size={18} weight="fill" />
				{props.timestamp}
			</span>
		</li>
	);

	return <>{isEditing ? editView : defaultView}</>;
}
