import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	// 프로젝트에서 빌드 결과물의 출력 디렉토리를 변경
	build: {
		outDir: 'build',	// 기본값은 'dist'
		emptyOutDir: true, 	// 빌드 전 디렉토리 비우기

		//(!) Some chunks are larger than 500 kB after minification. ... 애러 방지
		chunkSizeWarningLimit: 1500, // 경고 표시 기준을 500KB에서 1.5 MB로 상향
	},

	// 개발 서버 설정
	server: {
		// Chrome DevTools 요청 무시
		fs: {
			allow: ['..']
		}
	}
});
