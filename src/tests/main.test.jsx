import { describe, test, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
	describe("Inputing tasks OK", () => {
		test("Show warning if Input is empty", async () => {
			const button = screen.queryByText(/Add/i);
			await fireEvent.click(button);
			await screen.findByRole("alert");
		});
		// const inputField = screen.getByPlaceholderText("Add a task...");
		// expect(inputField.element).toBe("");
		// fireEvent.click(screen.queryByText(/Add/i));
		// expect(await screen.getByPlaceholderText("Add a task...").toEqual(""));
	});
});
