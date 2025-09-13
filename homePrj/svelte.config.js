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
			$data: 'src/data',
			$common: 'src/common',
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
	
	onwarn: (warning, handler) => {
		// 특정 접근성 경고만 무시 (aria-label로 해결되지 않는 것들)
		if (warning.code === 'a11y-click-events-have-key-events' ||
			warning.code === 'a11y-no-static-element-interactions') {
			return;
		}
		// 다른 경고는 기본 처리
		handler(warning);
	},
};

export default config;
