import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		extensions: [".js", ".mjs"]
	},
	plugins: [react()],
	base: "/react-to-do/"
});
