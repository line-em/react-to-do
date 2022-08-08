import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<div className="wrapper">
			<App />
			<footer>
				Coded with 🤍 and tea by
				<a
					href="https://github.com/line-em"
					target="_blank"
					rel="noopener noreferrer"
					alt="Link to Open Trivia API"
					role={"link"}
				>
					@Line-em.
				</a>
			</footer>
		</div>
	</React.StrictMode>
);
