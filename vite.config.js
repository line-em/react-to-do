import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		extensions: [".js", ".mjs"]
	},
	plugins: [react()],
	test: {
		globals: true,
		environment: "happy-dom",
		include: ["**/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
	},
	base: "/react-to-do/"
});
