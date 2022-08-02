import React from "react";
import { Pencil, Trash, Clock } from "phosphor-react";

export default function Todo(props) {
	return (
		<li key={props.id}>
			<label htmlFor={`${props.id} + "task"`}>
				<input name={`${props.id} + "task"`} type="checkbox" id={`${props.id} + "task"`} />
				{props.message}
			</label>

			<div className="task-actions">
				<abbr title="edit task">
					<Pencil size={18} weight="fill" />
					<span className="tooltip">Edit</span>
				</abbr>
				<abbr title="delete task">
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
