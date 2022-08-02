import React from "react";
import { Pen, Trash, Clock } from "phosphor-react";

export default function Todo(props) {
	return (
		<li>
			<label htmlFor={`${props.id}-task`}>
				<input name={`${props.id}-task`} type="checkbox" id={`${props.id}-task`} />
				{props.message}
			</label>

			<div className="task-actions">
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
}
