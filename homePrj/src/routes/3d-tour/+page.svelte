<script>
  import Apartment3DViewer from '$lib/components/Apartment3DViewer.svelte';
  
  let showNavigation = true;
  let showControls = true;
</script>

<svelte:head>
  <title>3D 아파트 투어 - MindCoding</title>
  <meta name="description" content="실제 아파트를 3D로 둘러보세요" />
</svelte:head>

<div class="page-container">
  <div class="page-header">
    <h1>3D 아파트 투어</h1>
    <p>실제 아파트 내부를 3D로 둘러보고 체험해보세요</p>
  </div>

  <div class="controls-section">
    <label class="control-item">
      <input type="checkbox" bind:checked={showNavigation} />
      <span>방 선택 네비게이션 표시</span>
    </label>
    <label class="control-item">
      <input type="checkbox" bind:checked={showControls} />
      <span>3D 컨트롤 표시</span>
    </label>
  </div>

  <div class="viewer-section">
    <Apartment3DViewer 
      width={800}
      height={600}
      {showNavigation}
      {showControls}
    />
  </div>

  <div class="info-section">
    <div class="info-card">
      <h3>🎯 주요 기능</h3>
      <ul>
        <li>실시간 3D 렌더링</li>
        <li>방별 자동 카메라 이동</li>
        <li>마우스/터치 컨트롤</li>
        <li>반응형 디자인</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>🛠️ 기술 스택</h3>
      <ul>
        <li>Three.js - 3D 렌더링</li>
        <li>Svelte - UI 프레임워크</li>
        <li>OrbitControls - 카메라 제어</li>
        <li>WebGL - 하드웨어 가속</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>📱 사용법</h3>
      <ul>
        <li>마우스 드래그: 시점 회전</li>
        <li>마우스 휠: 줌 인/아웃</li>
        <li>방 아이콘 클릭: 해당 방으로 이동</li>
        <li>전체보기 버튼: 초기 시점으로 복귀</li>
      </ul>
    </div>
  </div>
</div>

<style>
  .page-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .page-header h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 10px;
  }

  .page-header p {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }

  .controls-section {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .control-item {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #555;
  }

  .control-item input[type="checkbox"] {
    width: 16px;
    height: 16px;
  }

  .viewer-section {
    margin-bottom: 40px;
  }

  .info-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }

  .info-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #007bff;
  }

  .info-card h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 18px;
  }

  .info-card ul {
    margin: 0;
    padding-left: 20px;
  }

  .info-card li {
    margin-bottom: 8px;
    color: #666;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .page-container {
      padding: 10px;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .controls-section {
      flex-direction: column;
      gap: 15px;
    }

    .info-section {
      grid-template-columns: 1fr;
    }
  }
</style>
