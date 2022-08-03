import React from "react";

export default function Filters(props) {
	return (
		<section className="filter-buttons">
			<button
				className="action_button"
				onClick={() => props.setSelectView("all")}
				disabled={props.selectView === "all"}
			>
				Show All
			</button>
			<button
				className="action_button"
				onClick={() => props.setSelectView("completed")}
				disabled={props.selectView === "completed"}
			>
				Completed
			</button>
			<button
				className="action_button"
				onClick={() => props.setSelectView("active")}
				disabled={props.selectView === "active"}
			>
				Active
			</button>
		</section>
	);
}
