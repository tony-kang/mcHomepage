<script>
	let isMenuOpen = $state(false);
	let isSubMenuOpen = $state(false);
	let openSubMenu = $state('');
	let mobileOpenSubMenu = $state('');

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
		// 모바일 메뉴가 열릴 때 서브메뉴 초기화
		if (!isMenuOpen) {
			mobileOpenSubMenu = '';
		}
	};

	const toggleMobileSubMenu = (menuName) => {
		mobileOpenSubMenu = mobileOpenSubMenu === menuName ? '' : menuName;
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
					<li><a href="/about">스토리</a></li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Services'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/services">서비스</a>
						{#if openSubMenu === 'Services'}
							<div class="dropdown-menu" style="min-width: 500px;">
								<div class="dropdown-section">
									<h4>핵심 서비스</h4>
									<ul>
										<li><a href="/services/pti-code">PTI:CODE</a></li>
										<li><a href="/services/psychological">심리재능</a></li>
										<li><a href="/services/learning-career">학습진로</a></li>
										<li><a href="/services/relationship">관계소통</a></li>
										<li><a href="/services/business">비즈니스</a></li>
									</ul>
								</div>
						<div class="dropdown-section">
							<h4>특별 프로그램</h4>
							<ul>
								<li><a href="/services/learning-camp">학습 캠프</a></li>
								<li><a href="/services/career-camp">진로 캠프</a></li>
								<li><a href="/services/workshop">워크숍</a></li>
							</ul>
						</div>
							</div>
						{/if}
					</li>
					<li><a href="/services/certification">자격과정</a></li>
					<li class="dropdown"
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Support'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/contact">고객지원</a>
						{#if openSubMenu === 'Support'}
							<div class="dropdown-menu" style="min-width: 200px;">
								<div class="dropdown-section">
									<ul>
										<li><a href="/contact">상담 신청</a></li>
										<li><a href="/faq">자주묻는 질문</a></li>
										<li><a href="/privacy">개인정보처리방침</a></li>
										<li><a href="/terms">이용약관</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
					<li class="dropdown" 
						onmouseenter={() => { isSubMenuOpen = true; openSubMenu = 'Info'}} 
						onmouseleave={() => { isSubMenuOpen = false; openSubMenu = ''}}>
						<a href="/notice">커뮤니티</a>
						{#if openSubMenu === 'Info'}
							<div class="dropdown-menu" style="min-width: 200px;">
								<div class="dropdown-section">
									<ul>
										<li><a href="/notice">공지사항</a></li>
										<li><a href="/news">뉴스</a></li>
										<li><a href="/events">이벤트</a></li>
									</ul>
								</div>
							</div>
						{/if}
					</li>
				</ul>
			</nav>

			<!-- Auth Buttons -->
			<div class="auth-buttons">
				<a href="/s/signIn" class="btn-login">Login</a>
				<a href="/s/signUp" class="btn-join">Join</a>
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
					<li><a href="/about">스토리</a></li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Services')}>서비스</button>
						{#if mobileOpenSubMenu === 'Services'}
							<ul class="mobile-dropdown-menu">
								<li class="mobile-dropdown-section">
									<h4>핵심 서비스</h4>
									<ul>
										<li><a href="/services/pti-code">PTI:CODE</a></li>
										<li><a href="/services/psychological">심리재능</a></li>
										<li><a href="/services/learning-career">학습진로</a></li>
										<li><a href="/services/relationship">관계소통</a></li>
										<li><a href="/services/business">비즈니스</a></li>
									</ul>
								</li>
								<li class="mobile-dropdown-section">
									<h4>특별 프로그램</h4>
									<ul>
										<li><a href="/services/learning-camp">학습 캠프</a></li>
										<li><a href="/services/career-camp">진로 캠프</a></li>
										<li><a href="/services/workshop">워크숍</a></li>
									</ul>
								</li>
							</ul>
						{/if}
					</li>
					<li><a href="/services/certification">자격과정</a></li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Support')}>고객지원</button>
						{#if mobileOpenSubMenu === 'Support'}
							<ul class="mobile-dropdown-menu">
								<li><a href="/contact">상담 신청</a></li>
								<li><a href="/faq">자주묻는 질문</a></li>
								<li><a href="/privacy">개인정보처리방침</a></li>
								<li><a href="/terms">이용약관</a></li>
							</ul>
						{/if}
					</li>
					<li class="mobile-dropdown">
						<button onclick={() => toggleMobileSubMenu('Info')}>커뮤니티</button>
						{#if mobileOpenSubMenu === 'Info'}
							<ul class="mobile-dropdown-menu">
								<li><a href="/notice">공지사항</a></li>
								<li><a href="/news">뉴스</a></li>
								<li><a href="/events">이벤트</a></li>
							</ul>
						{/if}
					</li>
				</ul>
				
				<!-- Mobile Auth Buttons -->
				<div class="mobile-auth-buttons">
					<a href="/s/signIn" class="mobile-btn-login">Login</a>
					<a href="/s/signUp" class="mobile-btn-join">Join</a>
					<a href="/sitemap" class="mobile-btn-sitemap">Site Map</a>
				</div>
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

	.mobile-dropdown-section {
		margin-bottom: 20px;
	}

	.mobile-dropdown-section h4 {
		font-size: 14px;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
		padding: 0;
	}

	.mobile-dropdown-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.mobile-dropdown-section li {
		margin-bottom: 5px;
	}

	.mobile-dropdown-section a {
		font-size: 13px;
		color: #666;
		padding: 5px 0;
	}

	/* Mobile Auth Buttons */
	.mobile-auth-buttons {
		margin-top: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
		border-top: 1px solid #e5e5e5;
		display: flex;
		gap: 10px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.mobile-btn-login,
	.mobile-btn-join,
	.mobile-btn-sitemap {
		padding: 8px 16px;
		border-radius: 20px;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		transition: all 0.3s ease;
		border: 1px solid;
		text-align: center;
		min-width: 80px;
	}

	.mobile-btn-login {
		color: #667eea;
		border-color: #667eea;
		background: transparent;
	}

	.mobile-btn-login:hover {
		background: #667eea;
		color: white;
	}

	.mobile-btn-join {
		color: white;
		border-color: #667eea;
		background: #667eea;
	}

	.mobile-btn-join:hover {
		background: #5a67d8;
		border-color: #5a67d8;
	}

	.mobile-btn-sitemap {
		color: #666;
		border-color: #ccc;
		background: transparent;
	}

	.mobile-btn-sitemap:hover {
		background: #f5f5f5;
		border-color: #999;
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
