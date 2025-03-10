import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from './remark-reading-time.mjs';

const options = {
	contentPath: "src/content/blog"
};

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react(), mdx()],
	site: 'https://tembo.io',
	redirects: {
		'/product': '/',
		'/pricing': '/',
		'/blog/introducing-coredb': '/blog/introducing-tembo',
		'/blog/manifesto': '/blog/tembo-manifesto',
		'/waitlist': '/'
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: {
			wrap: true,
		}
	},
	vite: {
		ssr: {
			noExternal: ['react-tweet']
		}
	}
});
