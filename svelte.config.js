import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';
// import Inspector from 'vite-plugin-svelte-inspector';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
    vite: {
      // plugins: [Inspector()],
    },
		// adapter: adapter()
		adapter: adapter(),
    
    prerender: {
      // This can be false if you're using a fallback (i.e. SPA mode)
      default: true
    },
		browser: {
      router: false
    }
	}
};

export default config;
