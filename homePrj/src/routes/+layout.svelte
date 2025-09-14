<script>
	import { onMount } from 'svelte';
	import ___prj from '$prj/prjMain';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	export let children;

	onMount(async () => {
		await ___prj.init();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<slot />
