import { describe, test, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
// import App from "../App";
// import Todo from "../components/Todo";
import Todo from "T:/Users/leia_/Front-End/React Projects/todo-app/src/components/Todo.jsx";
import App from "T:/Users/leia_/Front-End/React Projects/todo-app/src/App.jsx";
import "@testing-library/react";

describe("App renders correctly", () => {
	beforeEach(() => {
		render(<App />);
	});
	describe("Initial Render OK", () => {
		test("Should show title", () => {
			expect(screen.getByText(/Today I will.../)).toBeDefined();
		});
		test("Should render Add button", () => {
			expect(screen.queryByText(/Add/i)).toBeDefined();
		});
		test("Should have an Input field", () => {
			expect(screen.getByPlaceholderText("Add a task...")).toBeDefined();
		});
	});
	describe("Interactivity Tests", () => {
		const item = {
			id: 1,
			timestamp: "June",
			message: "do the dishes",
			completed: true
		};

		test("Show warning if Input is empty", async () => {
			const button = screen.queryByText(/Add/i);
			await fireEvent.click(button);
			await screen.findByRole("alert");
		});

		test("Show todo if button in pressed", async () => {
			const inputField = screen.getByPlaceholderText("Add a task...");
			const button = screen.queryByText(/Add/i);

			fireEvent.change(inputField, { target: { value: "do the dishes" } });
			expect(inputField.value).toBe("do the dishes");

			fireEvent.click(button);
			expect(screen.findByText("do the dishes")).toBeDefined();
		});

		test("Should Render todo", () => {
			const { getByText } = render(<Todo {...item} />);
			expect(getByText(item.message)).toBeTruthy();
		});

		test("Should Delete todo", () => {
			const { getByText } = render(<Todo {...item} />);
			expect(getByText(item.message)).toBeTruthy();
			const deleteButton = screen.getByTitle("delete task");
			console.log(deleteButton.parentNode);
			fireEvent.click(deleteButton);
			expect(getByText(item.message)).toBeFalsy();
		});
	});
});
