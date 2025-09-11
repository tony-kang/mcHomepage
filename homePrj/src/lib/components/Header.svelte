<script>
	let isMenuOpen = $state(false);
	let isSubMenuOpen = $state(false);
	let openSubMenu = $state('');

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const toggleStayMenu = () => {
		isSubMenuOpen = !isSubMenuOpen;
	};
</script>

<header class="header">
	<div class="container">
		<div class="header-content">
			<!-- Logo -->
			<div class="logo">
				<a href="/">
					<img class="mt-2" src="/logo/mc_mindcoding_pattern_1_light.png" alt="마인드코딩" />
				</a>
			</div>

			<!-- Desktop Navigation -->
			<nav class="desktop-nav">
				<ul class="nav-list">
					<li><a href="/about">About</a></li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Services'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/services">Services</a>
						{#if openSubMenu === 'Services'}
							<div class="dropdown-menu" style="min-width: 300px;">
								<div class="dropdown-section">
									<h4>학생상담</h4>
									<ul>
										<li><a href="/stay/apt/sindongtan">PTI CODE 검사</a></li>
										<li><a href="/stay/apt/dongtan2">상담 & 코칭</a></li>
										<li><a href="/stay/apt/munrae">컨설팅</a></li>
										<li><a href="/stay/apt/munrae">교육 & 특강</a></li>
										<li><a href="/stay/apt/munrae">캠프 & 워크숍</a></li>
									</ul>
								</div>
								<div class="dropdown-section">
									<h4>자격과정</h4>
									<ul>
										<li><a href="/stay/office/geumcheon">Coach</a></li>
										<li><a href="/stay/retail">Pro</a></li>
										<li><a href="/stay/retail">Master</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Brands'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/stay">Brands</a>
						{#if openSubMenu === 'Brands'}
							<div class="dropdown-menu" style="min-width: 300px;">
								<div class="dropdown-section">
									<h4>학습코칭/컨설팅</h4>
									<ul>
										<li><a href="/stay/apt/sindongtan">질풍가도 입시컨설팅</a></li>
										<li><a href="/stay/apt/dongtan2">VIVA 학습코칭</a></li>
										<li><a href="/stay/apt/munrae">VIVA B&M 학습케어</a></li>
									</ul>
								</div>
								<div class="dropdown-section">
									<h4>Certification</h4>
									<ul>
										<li><a href="/stay/office/geumcheon">Coach</a></li>
										<li><a href="/stay/retail">Pro</a></li>
										<li><a href="/stay/retail">Master</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
					<li class="dropdown" 
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Info'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/info">Info</a>
						{#if openSubMenu === 'Info'}
							<div class="dropdown-menu" style="min-width: 200px;">
								<div class="dropdown-section">
									<ul>
										<li><a href="/stay/apt/sindongtan">공지사항</a></li>
										<li><a href="/stay/apt/dongtan2">자주묻는 질문</a></li>
										<li><a href="/stay/apt/munrae">문의사항</a></li>
										<li><a href="/stay/apt/munrae">이용약관</a></li>
										<li><a href="/stay/apt/munrae">개인정보처리방침</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
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
						{#if isSubMenuOpen}
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
		height: 60px;
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
