// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
	extends: [
		"next/core-web-vitals",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
	],
	plugins: ["@typescript-eslint", "prettier", "import"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: path.join(__dirname, "tsconfig.json"),
	},
	settings: {
		"import/resolver": {
			typescript: {
				alwaysTryTypes: true,
			},
		},
	},
	overrides: [
		{
			extends: [
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
			],
			files: ["*.ts", "*.tsx"],
			parserOptions: {
				project: path.join(__dirname, "tsconfig.json"),
			},
		},
	],
	rules: {
		"@typescript-eslint/consistent-type-imports": [
			"warn",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{ argsIgnorePattern: "^_" },
		],
		"import/order": [
			"error",
			{
				"newlines-between": "always",
				alphabetize: {
					order: "asc",
					caseInsensitive: true,
				},
				groups: [
					"builtin",
					"external",
					"internal",
					"parent",
					"sibling",
					"index",
				],
				pathGroups: [
					{
						pattern: "@/**",
						group: "internal",
						position: "after",
					},
				],
			},
		],
	},
};

module.exports = config;
