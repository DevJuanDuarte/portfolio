/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				surface: 'rgb(var(--color-surface) / <alpha-value>)',
				'surface-raised': 'rgb(var(--color-surface-raised) / <alpha-value>)',
				ink: 'rgb(var(--color-ink) / <alpha-value>)',
				'ink-muted': 'rgb(var(--color-ink-muted) / <alpha-value>)',
				accent: 'rgb(var(--color-accent) / <alpha-value>)',
				'accent-soft': 'rgb(var(--color-accent-soft) / <alpha-value>)',
				'accent-contrast': 'rgb(var(--color-accent-contrast) / <alpha-value>)',
				line: 'rgb(var(--color-line) / <alpha-value>)',
				'success-bg': 'rgb(var(--color-success-bg) / <alpha-value>)',
				'success-text': 'rgb(var(--color-success-text) / <alpha-value>)',
				'glow-1': 'rgb(var(--color-glow-1) / <alpha-value>)',
				'glow-2': 'rgb(var(--color-glow-2) / <alpha-value>)',
				'glow-3': 'rgb(var(--color-glow-3) / <alpha-value>)',
			},
			fontSize: {
				hero: ['clamp(2.75rem, 3rem + 3vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
				'section-title': ['clamp(1.75rem, 1.4rem + 1.5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
			},
		},
	},
	plugins: [],
}
