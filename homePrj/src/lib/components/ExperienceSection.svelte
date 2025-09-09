<script>
	const experiences = [
		{
			title: "임대료 인상률 5%이하",
			description: "과도한 임대료 인상에 대한 걱정이 없으며 장기계약 시 임대료 감면 혜택",
			icon: "💰"
		},
		{
			title: "8년간 내집처럼 안정적인 거주",
			description: "퇴거불안 해소, 의무임대기간인 8년간 임대계약 갱신 가능",
			icon: "🏠"
		},
		{
			title: "캐슬링크 자유로운 주거이전",
			description: "생애주기 변화에 맞게 자유로운 단지내 이동 및 단지간 이동 가능",
			icon: "🔄"
		},
		{
			title: "취득세 및 보유세 없음",
			description: "취득세와 재산세 등 부동산의 취득 및 보유와 관련한 세제 부담 없음",
			icon: "📋"
		},
		{
			title: "국내최고 브랜드 주거 상품",
			description: "정성과 존중의 가치를 담아 생활의 품격을 더하는 고품격 브랜드 주거",
			icon: "⭐"
		},
		{
			title: "편리한 IT 서비스",
			description: "국내최초 민간임대 전자계약, 입주자 전용 스마트폰 서비스 플랫폼",
			icon: "📱"
		},
		{
			title: "다양한 커뮤니티 & 프로그램",
			description: "입주민의 수요에 맞춘 전문화 된 커뮤니티 프로그램 및 관리 서비스",
			icon: "👥"
		},
		{
			title: "엘리스만의 특별한 주거서비스",
			description: "롯데그룹 특별제휴 서비스 및 편리한 생활서비스 제공",
			icon: "🎁"
		},
		{
			title: "친절한 엘리스 센터",
			description: "임대관리 서비스를 위한단지내 엘리스 센터 운영",
			icon: "🏢"
		}
	];
</script>

<section class="experience-section">
	<div class="container">
		<div class="section-header">
			<h2>엘리스와 함께하는 특별한 경험</h2>
		</div>

		<div class="experiences-grid">
			{#each experiences as experience}
				<div class="experience-card">
					<div class="experience-icon">
						<span class="icon">{experience.icon}</span>
					</div>
					<div class="experience-content">
						<h3 class="experience-title">{experience.title}</h3>
						<p class="experience-description">{experience.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.experience-section {
		padding: 80px 0;
		background: #fff;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.section-header {
		text-align: center;
		margin-bottom: 60px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.experiences-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
	}

	.experience-card {
		display: flex;
		align-items: flex-start;
		gap: 20px;
		padding: 30px;
		background: #f8f9fa;
		border-radius: 12px;
		transition: all 0.3s ease;
		border: 1px solid #e9ecef;
	}

	.experience-card:hover {
		background: #fff;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
		transform: translateY(-3px);
		border-color: #007bff;
	}

	.experience-icon {
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		background: #007bff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;
	}

	.experience-card:hover .experience-icon {
		background: #0056b3;
		transform: scale(1.1);
	}

	.icon {
		font-size: 24px;
		color: #fff;
	}

	.experience-content {
		flex: 1;
	}

	.experience-title {
		font-size: 1.2rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 12px 0;
		line-height: 1.4;
	}

	.experience-description {
		color: #666;
		font-size: 14px;
		line-height: 1.6;
		margin: 0;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.experience-section {
			padding: 60px 0;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.experiences-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.experience-card {
			padding: 20px;
			gap: 15px;
		}

		.experience-icon {
			width: 50px;
			height: 50px;
		}

		.icon {
			font-size: 20px;
		}

		.experience-title {
			font-size: 1.1rem;
		}

		.container {
			padding: 0 15px;
		}
	}

	@media (max-width: 480px) {
		.section-header h2 {
			font-size: 1.8rem;
		}

		.experience-card {
			flex-direction: column;
			text-align: center;
			padding: 20px 15px;
		}

		.experience-icon {
			align-self: center;
		}

		.experience-title {
			font-size: 1rem;
		}

		.experience-description {
			font-size: 13px;
		}
	}
</style>



