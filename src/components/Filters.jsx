import React from "react";

export default function Filters(props) {
	return (
		<section className="filter-buttons">
			<button className="action_button" onClick={() => props.setSelectView("all")}>
				Show All
			</button>
			<button className="action_button" onClick={() => props.setSelectView("completed")}>
				Completed
			</button>
			<button className="action_button" onClick={() => props.setSelectView("active")}>
				Active
			</button>
		</section>
	);
}
