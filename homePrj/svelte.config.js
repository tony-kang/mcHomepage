import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		alias: {
			$src: 'src',
			$lib: 'src/lib',
			$prj: 'src/prj',
			$profile: 'src/profile',
			$common: 'src/common',
			$data: 'src/data',
		}
	},

	compilerOptions: {
		// Svelte 4 컴포넌트 API와 호환성 유지
		// 호환이 안되는 콤포넌트
		//     @svelte-plugins/tooltips
		// compatibility: {
		// 	componentApi: 4
		// }
	},
};

export default config;
