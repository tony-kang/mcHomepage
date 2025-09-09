<script>
	import Header from '$lib/components/Header.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ServicesSection from '$lib/components/ServicesSection.svelte';
	import ExperienceSection from '$lib/components/ExperienceSection.svelte';
	import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>엘리스 - 당신의 라이프스타일을 바꿀 새로운 주거서비스 플랫폼</title>
	<meta name="description" content="엘리스와 함께하는 특별한 주거 경험. 롯데캐슬 브랜드 주거상품으로 안정적이고 편리한 생활을 시작하세요." />
</svelte:head>

<Header />
<HeroSection />
<ServicesSection />
<ExperienceSection />
<TestimonialsSection />
<Footer />
