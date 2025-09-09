<script>
	let isMenuOpen = $state(false);
	let isStayMenuOpen = $state(false);

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const toggleStayMenu = () => {
		isStayMenuOpen = !isStayMenuOpen;
	};
</script>

<header class="header">
	<div class="container">
		<div class="header-content">
			<!-- Logo -->
			<div class="logo">
				<a href="/">
					<img src="/logo.svg" alt="Elyes" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="desktop-nav">
				<ul class="nav-list">
					<li><a href="/about">About</a></li>
					<li><a href="/services">Services</a></li>
					<li class="dropdown" onmouseenter={() => isStayMenuOpen = true} onmouseleave={() => isStayMenuOpen = false}>
						<a href="/stay">Stay</a>
						{#if isStayMenuOpen}
							<div class="dropdown-menu">
								<div class="dropdown-section">
									<h4>공동주택</h4>
									<ul>
										<li><a href="/stay/apt/sindongtan">신동탄 롯데캐슬</a></li>
										<li><a href="/stay/apt/dongtan2">동탄2 롯데캐슬</a></li>
										<li><a href="/stay/apt/munrae">문래 롯데캐슬</a></li>
										<li><a href="/stay/apt/doksan">독산역 롯데캐슬</a></li>
										<li><a href="/stay/apt/hangang">한강 롯데캐슬 22단지</a></li>
										<li><a href="/stay/apt/hadan">하단 롯데캐슬</a></li>
										<li><a href="/stay/apt/sasong">사송 롯데캐슬</a></li>
										<li><a href="/stay/apt/sujigu">수지구청역 롯데캐슬하이브 엘</a></li>
										<li><a href="/stay/apt/dobong">도봉 롯데캐슬골든파크</a></li>
									</ul>
								</div>
								<div class="dropdown-section">
									<h4>오피스텔, 청년주택</h4>
									<ul>
										<li><a href="/stay/officetel/munrae">문래 롯데캐슬 오피스텔</a></li>
										<li><a href="/stay/officetel/wonhyo">용산 원효 루미니</a></li>
										<li><a href="/stay/officetel/namyoung">용산 남영역 롯데캐슬헤리티지</a></li>
										<li><a href="/stay/officetel/seocho">서초 청년주택</a></li>
										<li><a href="/stay/officetel/gasan">어바니엘 가산</a></li>
										<li><a href="/stay/officetel/hangang">어바니엘 한강</a></li>
										<li><a href="/stay/officetel/yeomchang">어바니엘 염창역</a></li>
										<li><a href="/stay/officetel/chungjeong">어바니엘 충정로</a></li>
										<li><a href="/stay/officetel/cheonho">어바니엘 천호</a></li>
									</ul>
								</div>
								<div class="dropdown-section">
									<h4>오피스, 리테일</h4>
									<ul>
										<li><a href="/stay/office/geumcheon">금천 롯데타워</a></li>
										<li><a href="/stay/retail">롯데캐슬 단지내 상가</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
					<li><a href="/info">Info</a></li>
				</ul>
			</nav>

			<!-- Auth Buttons -->
			<div class="auth-buttons">
				<a href="/login" class="btn-login">Login</a>
				<a href="/join" class="btn-join">Join</a>
				<a href="/sitemap" class="btn-sitemap">Site Map</a>
			</div>

			<!-- Mobile Menu Toggle -->
			<button class="mobile-menu-toggle" onclick={toggleMenu} aria-label="메뉴 열기/닫기">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<nav class="mobile-nav">
				<ul class="mobile-nav-list">
					<li><a href="/about">About</a></li>
					<li><a href="/services">Services</a></li>
					<li class="mobile-dropdown">
						<button onclick={toggleStayMenu}>Stay</button>
						{#if isStayMenuOpen}
							<ul class="mobile-dropdown-menu">
								<li><a href="/stay/apt">공동주택</a></li>
								<li><a href="/stay/officetel">오피스텔/청년주택</a></li>
								<li><a href="/stay/office">오피스/리테일</a></li>
							</ul>
						{/if}
					</li>
					<li><a href="/info">Info</a></li>
					<li><a href="/login">Login</a></li>
					<li><a href="/join">Join</a></li>
				</ul>
			</nav>
		{/if}
	</div>
</header>

<style>
	.header {
		background: #fff;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.header-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 70px;
	}

	.logo img {
		height: 40px;
	}

	.desktop-nav {
		display: flex;
		align-items: center;
	}

	.nav-list {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 30px;
	}

	.nav-list li {
		position: relative;
	}

	.nav-list a {
		text-decoration: none;
		color: #333;
		font-weight: 500;
		font-size: 16px;
		transition: color 0.3s ease;
	}

	.nav-list a:hover {
		color: #007bff;
	}

	.dropdown {
		position: relative;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		background: #fff;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		border-radius: 8px;
		padding: 20px;
		min-width: 600px;
		display: flex;
		gap: 30px;
		z-index: 1001;
	}

	.dropdown-section h4 {
		margin: 0 0 15px 0;
		color: #333;
		font-size: 16px;
		font-weight: 600;
	}

	.dropdown-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.dropdown-section li {
		margin-bottom: 8px;
	}

	.dropdown-section a {
		color: #666;
		font-size: 14px;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.dropdown-section a:hover {
		color: #007bff;
	}

	.auth-buttons {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.btn-login,
	.btn-join,
	.btn-sitemap {
		padding: 8px 16px;
		text-decoration: none;
		border-radius: 4px;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.btn-login {
		color: #333;
		border: 1px solid #ddd;
	}

	.btn-login:hover {
		background: #f8f9fa;
	}

	.btn-join {
		background: #007bff;
		color: #fff;
	}

	.btn-join:hover {
		background: #0056b3;
	}

	.btn-sitemap {
		color: #666;
		font-size: 12px;
	}

	.mobile-menu-toggle {
		display: none;
		flex-direction: column;
		background: none;
		border: none;
		cursor: pointer;
		padding: 5px;
	}

	.mobile-menu-toggle span {
		width: 25px;
		height: 3px;
		background: #333;
		margin: 3px 0;
		transition: 0.3s;
	}

	.mobile-nav {
		display: none;
		background: #fff;
		border-top: 1px solid #eee;
	}

	.mobile-nav-list {
		list-style: none;
		margin: 0;
		padding: 20px 0;
	}

	.mobile-nav-list li {
		margin-bottom: 15px;
	}

	.mobile-nav-list a,
	.mobile-nav-list button {
		display: block;
		padding: 10px 0;
		color: #333;
		text-decoration: none;
		font-size: 16px;
		background: none;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.mobile-dropdown-menu {
		list-style: none;
		margin: 10px 0 0 20px;
		padding: 0;
	}

	.mobile-dropdown-menu li {
		margin-bottom: 8px;
	}

	.mobile-dropdown-menu a {
		font-size: 14px;
		color: #666;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.desktop-nav,
		.auth-buttons {
			display: none;
		}

		.mobile-menu-toggle {
			display: flex;
		}

		.mobile-nav {
			display: block;
		}

		.container {
			padding: 0 15px;
		}

		.header-content {
			height: 60px;
		}

		.logo img {
			height: 35px;
		}
	}

	@media (max-width: 1024px) {
		.dropdown-menu {
			min-width: 500px;
		}
	}

	@media (max-width: 768px) {
		.dropdown-menu {
			position: static;
			box-shadow: none;
			border-radius: 0;
			padding: 10px 0;
			min-width: auto;
			flex-direction: column;
			gap: 15px;
		}
	}
</style>
