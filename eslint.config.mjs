import rootConfig from '../../.eslint.config.mjs';

export default [
	...rootConfig,
	{
		files: ['app/_layout.tsx'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
	},
];
