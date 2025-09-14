import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$src: 'src',
			$lib: 'src/lib',
			$prj: 'src/prj',
			$data: 'src/data',
			$common: 'src/common',
		}
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
