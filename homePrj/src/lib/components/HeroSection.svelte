<script>
	let currentSlide = $state(0);
	
	const slides = [
		{
			title: "교육을 넘어 경영",
			subtitle: "마음으로",
			description: "마인드코딩",
			image: "https://via.placeholder.com/1200x600/007bff/ffffff?text=교육을+넘어+경영"
		},
		{
			title: "심리재능 기반",
			subtitle: "PTI:CODE로",
			description: "개인의 성장을 설계합니다",
			image: "https://via.placeholder.com/1200x600/28a745/ffffff?text=심리재능+기반"
		},
		{
			title: "네 가지 영역",
			subtitle: "심리·학습·관계·비즈니스",
			description: "삶의 전 영역을 경영하듯 관리합니다",
			image: "https://via.placeholder.com/1200x600/dc3545/ffffff?text=네+가지+영역"
		}
	];

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % slides.length;
	};

	const prevSlide = () => {
		currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
	};

	const goToSlide = (index) => {
		currentSlide = index;
	};

	// Auto slide
	setInterval(() => {
		nextSlide();
	}, 5000);
</script>

<section class="hero-section">
	<div class="hero-slider">
		{#each slides as slide, index}
			<div class="slide" class:active={index === currentSlide}>
				<div class="slide-content">
					<div class="container">
						<div class="hero-text">
							<h1 class="hero-title">{slide.title}</h1>
							<h2 class="hero-subtitle">{slide.subtitle}</h2>
							<p class="hero-description">{slide.description}</p>
						</div>
					</div>
				</div>
				<div class="slide-bg" style="background-image: url('{slide.image}')"></div>
			</div>
		{/each}
	</div>

	<!-- Navigation Arrows -->
	<button class="nav-arrow prev" onclick={prevSlide} aria-label="이전 슬라이드">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>
	<button class="nav-arrow next" onclick={nextSlide} aria-label="다음 슬라이드">
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	<!-- Slide Indicators -->
	<div class="slide-indicators">
		{#each slides as _, index}
			<button 
				class="indicator" 
				class:active={index === currentSlide}
				onclick={() => goToSlide(index)}
				aria-label="슬라이드 {index + 1}로 이동"
			></button>
		{/each}
	</div>

	<!-- Slide Numbers -->
	<div class="slide-numbers">
		<span class="current">{currentSlide + 1}</span>
		<span class="total">{slides.length}</span>
	</div>
</section>

<style>
	.hero-section {
		position: relative;
		height: 100vh;
		overflow: hidden;
		margin-top: 70px; /* Header height */
	}

	.hero-slider {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 1s ease-in-out;
	}

	.slide.active {
		opacity: 1;
	}

	.slide-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.slide-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.slide-content {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		width: 100%;
	}

	.hero-text {
		color: #fff;
		max-width: 600px;
	}

	.hero-title {
		font-size: 4rem;
		font-weight: 700;
		margin: 0 0 20px 0;
		line-height: 1.2;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
	}

	.hero-subtitle {
		font-size: 1.5rem;
		font-weight: 400;
		margin: 0 0 15px 0;
		line-height: 1.4;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.hero-description {
		font-size: 1.2rem;
		font-weight: 300;
		margin: 0;
		line-height: 1.5;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.nav-arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 3;
	}

	.nav-arrow:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: translateY(-50%) scale(1.1);
	}

	.nav-arrow.prev {
		left: 30px;
	}

	.nav-arrow.next {
		right: 30px;
	}

	.slide-indicators {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 10px;
		z-index: 3;
	}

	.indicator {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.5);
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.indicator.active {
		background: #fff;
		border-color: #fff;
	}

	.indicator:hover {
		border-color: #fff;
		background: rgba(255, 255, 255, 0.5);
	}

	.slide-numbers {
		position: absolute;
		bottom: 30px;
		right: 30px;
		color: #fff;
		font-size: 1.2rem;
		font-weight: 500;
		z-index: 3;
		text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
	}

	.slide-numbers .current {
		font-size: 2rem;
		font-weight: 700;
	}

	.slide-numbers .total {
		opacity: 0.7;
		margin-left: 5px;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.hero-section {
			height: 70vh;
		}

		.hero-title {
			font-size: 2.5rem;
		}

		.hero-subtitle {
			font-size: 1.2rem;
		}

		.hero-description {
			font-size: 1rem;
		}

		.nav-arrow {
			width: 40px;
			height: 40px;
		}

		.nav-arrow.prev {
			left: 15px;
		}

		.nav-arrow.next {
			right: 15px;
		}

		.slide-indicators {
			bottom: 20px;
		}

		.slide-numbers {
			bottom: 20px;
			right: 15px;
			font-size: 1rem;
		}

		.slide-numbers .current {
			font-size: 1.5rem;
		}

		.container {
			padding: 0 15px;
		}
	}

	@media (max-width: 480px) {
		.hero-title {
			font-size: 2rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.hero-description {
			font-size: 0.9rem;
		}
	}
</style>
