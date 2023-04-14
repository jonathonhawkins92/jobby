/** @type {import("prettier").Config} */

const config = {
	tabWidth: 4,
	useTabs: true,
	endOfLine: "lf",
	singleAttributePerLine: true,
	plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
