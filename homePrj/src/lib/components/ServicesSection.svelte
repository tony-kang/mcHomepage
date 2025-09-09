<script>
	let activeTab = $state('apt');
	let activeRegion = $state('all');

	const tabs = [
		{ id: 'apt', label: 'APT' },
		{ id: 'officetel', label: '오피스텔/도시형생활주택/청년주택' }
	];

	const regions = [
		{ id: 'all', label: '전체' },
		{ id: 'seoul', label: '수도권' },
		{ id: 'gyeongnam', label: '경상남도' },
		{ id: 'busan', label: '부산광역시' }
	];

	const complexes = {
		apt: [
			{
				name: '신동탄 롯데캐슬',
				location: '경기도 화성시 효행로 1338-44',
				units: '1,185세대',
				region: 'seoul',
				image: '/images/sindongtan.jpg'
			},
			{
				name: '동탄2 롯데캐슬',
				location: '경기도 화성시 동탄대로2길 49',
				units: '612세대',
				region: 'seoul',
				image: '/images/dongtan2.jpg'
			},
			{
				name: '문래 롯데캐슬',
				location: '서울 영등포구 문래동6가 21번지',
				units: '499세대',
				region: 'seoul',
				image: '/images/munrae.jpg'
			},
			{
				name: '독산역 롯데캐슬',
				location: '서울시 금천구 독산동 1005번지',
				units: '919세대',
				region: 'seoul',
				image: '/images/doksan.jpg'
			},
			{
				name: '한강 롯데캐슬 22단지',
				location: '경기도 김포시 김포한강11로 107',
				units: '정보 없음',
				region: 'seoul',
				image: '/images/hangang.jpg'
			},
			{
				name: '하단 롯데캐슬',
				location: '부산광역시 사하구',
				units: '정보 없음',
				region: 'busan',
				image: '/images/hadan.jpg'
			}
		],
		officetel: [
			{
				name: '문래 롯데캐슬 오피스텔',
				location: '서울 영등포구 문래동',
				units: '정보 없음',
				region: 'seoul',
				image: '/images/munrae-officetel.jpg'
			},
			{
				name: '용산 원효 루미니',
				location: '서울특별시 용산구 원효로1가 104번지',
				units: '465세대',
				region: 'seoul',
				image: '/images/wonhyo.jpg'
			},
			{
				name: '용산 남영역 롯데캐슬헤리티지',
				location: '서울특별시 용산구',
				units: '정보 없음',
				region: 'seoul',
				image: '/images/namyoung.jpg'
			},
			{
				name: '서초 청년주택',
				location: '서울특별시 서초구',
				units: '정보 없음',
				region: 'seoul',
				image: '/images/seocho.jpg'
			}
		]
	};

	const filteredComplexes = $derived(() => {
		let items = [];
		if (activeTab === 'apt') {
			items = complexes.apt;
		} else if (activeTab === 'officetel') {
			items = complexes.officetel;
		}
		
		if (activeRegion !== 'all') {
			items = items.filter(item => item.region === activeRegion);
		}
		return items;
	});
</script>

<section class="services-section">
	<div class="container">
		<div class="section-header">
			<h2>엘리스 주거서비스 제공 단지</h2>
		</div>

		<!-- Tab Navigation -->
		<div class="tab-navigation">
			{#each tabs as tab}
				<button 
					class="tab-button" 
					class:active={activeTab === tab.id}
					onclick={() => activeTab = tab.id}
				>
					{tab.label}
				</button>
			{/each}
		</div>

		<!-- Region Filter -->
		<div class="region-filter">
			{#each regions as region}
				<button 
					class="region-button" 
					class:active={activeRegion === region.id}
					onclick={() => activeRegion = region.id}
				>
					{region.label}
				</button>
			{/each}
		</div>

		<!-- Complexes Grid -->
		<div class="complexes-grid">
			{#each filteredComplexes as complex}
				<div class="complex-card">
					<div class="complex-image">
						<img src={complex.image} alt={complex.name} />
					</div>
					<div class="complex-info">
						<h3 class="complex-name">{complex.name}</h3>
						<p class="complex-location">{complex.location}</p>
						<p class="complex-units">{complex.units}</p>
						<div class="complex-actions">
							<button class="btn-inquiry">문의하기</button>
							<button class="btn-detail">상세보기</button>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Table View Toggle -->
		<div class="view-toggle">
			<button class="view-button active">그리드 보기</button>
			<button class="view-button">테이블 보기</button>
		</div>

		<!-- Table View (Hidden by default) -->
		<div class="table-view" style="display: none;">
			<table class="complexes-table">
				<thead>
					<tr>
						<th>단지명</th>
						<th>소재지</th>
						<th>세대수</th>
						<th>문의</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredComplexes as complex}
						<tr>
							<td>{complex.name}</td>
							<td>{complex.location}</td>
							<td>{complex.units}</td>
							<td>
								<button class="btn-inquiry-small">문의하기</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<style>
	.services-section {
		padding: 80px 0;
		background: #f8f9fa;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.section-header {
		text-align: center;
		margin-bottom: 50px;
	}

	.section-header h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin: 0;
	}

	.tab-navigation {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		gap: 10px;
	}

	.tab-button {
		padding: 12px 24px;
		border: 2px solid #ddd;
		background: #fff;
		color: #666;
		border-radius: 25px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.tab-button.active {
		background: #007bff;
		border-color: #007bff;
		color: #fff;
	}

	.tab-button:hover:not(.active) {
		border-color: #007bff;
		color: #007bff;
	}

	.region-filter {
		display: flex;
		justify-content: center;
		margin-bottom: 40px;
		gap: 15px;
	}

	.region-button {
		padding: 8px 16px;
		border: 1px solid #ddd;
		background: #fff;
		color: #666;
		border-radius: 20px;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.region-button.active {
		background: #333;
		border-color: #333;
		color: #fff;
	}

	.region-button:hover:not(.active) {
		border-color: #333;
		color: #333;
	}

	.complexes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 30px;
		margin-bottom: 40px;
	}

	.complex-card {
		background: #fff;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.complex-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
	}

	.complex-image {
		height: 200px;
		overflow: hidden;
	}

	.complex-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.complex-card:hover .complex-image img {
		transform: scale(1.05);
	}

	.complex-info {
		padding: 20px;
	}

	.complex-name {
		font-size: 1.3rem;
		font-weight: 600;
		color: #333;
		margin: 0 0 10px 0;
	}

	.complex-location {
		color: #666;
		font-size: 14px;
		margin: 0 0 8px 0;
		line-height: 1.4;
	}

	.complex-units {
		color: #007bff;
		font-size: 14px;
		font-weight: 500;
		margin: 0 0 20px 0;
	}

	.complex-actions {
		display: flex;
		gap: 10px;
	}

	.btn-inquiry,
	.btn-detail {
		flex: 1;
		padding: 10px 16px;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.btn-inquiry {
		background: #007bff;
		color: #fff;
	}

	.btn-inquiry:hover {
		background: #0056b3;
	}

	.btn-detail {
		background: #f8f9fa;
		color: #333;
		border: 1px solid #ddd;
	}

	.btn-detail:hover {
		background: #e9ecef;
	}

	.view-toggle {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
		gap: 10px;
	}

	.view-button {
		padding: 8px 16px;
		border: 1px solid #ddd;
		background: #fff;
		color: #666;
		border-radius: 4px;
		font-size: 14px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.view-button.active {
		background: #007bff;
		border-color: #007bff;
		color: #fff;
	}

	.complexes-table {
		width: 100%;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.complexes-table th,
	.complexes-table td {
		padding: 15px;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	.complexes-table th {
		background: #f8f9fa;
		font-weight: 600;
		color: #333;
	}

	.complexes-table td {
		color: #666;
	}

	.btn-inquiry-small {
		padding: 6px 12px;
		background: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 12px;
		cursor: pointer;
		transition: background 0.3s ease;
	}

	.btn-inquiry-small:hover {
		background: #0056b3;
	}

	/* Responsive Design */
	@media (max-width: 768px) {
		.services-section {
			padding: 60px 0;
		}

		.section-header h2 {
			font-size: 2rem;
		}

		.tab-navigation {
			flex-direction: column;
			align-items: center;
		}

		.tab-button {
			width: 100%;
			max-width: 300px;
		}

		.region-filter {
			flex-wrap: wrap;
			justify-content: center;
		}

		.complexes-grid {
			grid-template-columns: 1fr;
			gap: 20px;
		}

		.container {
			padding: 0 15px;
		}

		.complexes-table {
			font-size: 14px;
		}

		.complexes-table th,
		.complexes-table td {
			padding: 10px;
		}
	}

	@media (max-width: 480px) {
		.section-header h2 {
			font-size: 1.8rem;
		}

		.complex-info {
			padding: 15px;
		}

		.complex-name {
			font-size: 1.1rem;
		}

		.complex-actions {
			flex-direction: column;
		}
	}
</style>
