<script>
	const footerLinks = {
		services: [
			{ name: '롯데월드', url: '/services/lotte-world' },
			{ name: '롯데시네마', url: '/services/lotte-cinema' },
			{ name: '롯데마트', url: '/services/lotte-mart' },
			{ name: '문화센터', url: '/services/culture-center' }
		]
	};
</script>

<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<!-- Company Info -->
			<div class="footer-section">
				<div class="company-info">
					<p><strong>롯데건설(주)</strong> 대표이사 : 박현철, 대표전화 02-3480-9114</p>
					<p>사업자등록번호 : 114-81-16377, 통신판매번호 : 2018-서울서초-1215</p>
					<p>서울시 서초구 잠원로14길 29</p>
					<p><a href="/business-info" class="business-link">사업자정보확인</a></p>
				</div>
			</div>

			<!-- Services Links -->
			<div class="footer-section">
				<h4>서비스</h4>
				<ul class="footer-links">
					{#each footerLinks.services as link}
						<li><a href={link.url}>{link.name}</a></li>
					{/each}
				</ul>
			</div>

			<!-- ISMS Certification -->
			<div class="footer-section">
				<div class="isms-cert">
					<h4>ISMS 인증</h4>
					<div class="cert-info">
						<p><strong>[인증범위]</strong> 분양 및 주거서비스(롯데건설 Elyes) 시스템 운영</p>
						<p><strong>[유효기간]</strong> 2022-08-03 ~ 2025-08-02</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div class="footer-bottom">
			<p class="copyright">
				COPYRIGHT© 2018 LOTTE ENGINEERING & CONSTRUCTION ALL RIGHTS RESERVED
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: #333;
		color: #fff;
		padding: 60px 0 20px;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.footer-content {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 40px;
		margin-bottom: 40px;
	}

	.footer-section h4 {
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 20px 0;
		color: #fff;
	}

	.company-info p {
		margin: 0 0 8px 0;
		font-size: 14px;
		line-height: 1.5;
		color: #ccc;
	}

	.business-link {
		color: #007bff;
		text-decoration: none;
		font-size: 14px;
	}

	.business-link:hover {
		text-decoration: underline;
	}

	.footer-links {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer-links li {
		margin-bottom: 8px;
	}

	.footer-links a {
		color: #ccc;
		text-decoration: none;
		font-size: 14px;
		transition: color 0.3s ease;
	}

	.footer-links a:hover {
		color: #007bff;
	}

	.isms-cert {
		background: rgba(255, 255, 255, 0.05);
		padding: 20px;
		border-radius: 8px;
	}

	.cert-info p {
		margin: 0 0 8px 0;
		font-size: 13px;
		line-height: 1.4;
		color: #ccc;
	}

	.cert-info strong {
		color: #fff;
	}

	.footer-bottom {
		border-top: 1px solid #555;
		padding-top: 20px;
		text-align: center;
	}

	.copyright {
		margin: 0;
		font-size: 12px;
		color: #999;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.footer {
			padding: 40px 0 20px;
		}

		.footer-content {
			grid-template-columns: 1fr;
			gap: 30px;
		}

		.container {
			padding: 0 15px;
		}

		.company-info p {
			font-size: 13px;
		}

		.footer-links a {
			font-size: 13px;
		}

		.cert-info p {
			font-size: 12px;
		}

		.copyright {
			font-size: 11px;
		}
	}

	@media (max-width: 480px) {
		.footer {
			padding: 30px 0 15px;
		}

		.footer-content {
			gap: 25px;
		}

		.isms-cert {
			padding: 15px;
		}

		.company-info p {
			font-size: 12px;
		}

		.footer-links a {
			font-size: 12px;
		}

		.cert-info p {
			font-size: 11px;
		}
	}
</style>



