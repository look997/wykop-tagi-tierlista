// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-node';
// import Inspector from 'vite-plugin-svelte-inspector';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    vite: {
      // plugins: [Inspector()],
    },
		// adapter: adapter()
		// adapter: adapter({
		// 	// default options are shown
		// 	pages: 'build',
		// 	assets: 'build',
		// 	precompress: false
		// })
		adapter: adapter({ out: 'public' }),
		browser: {
      router: false
    }
	}
};

export default config;
