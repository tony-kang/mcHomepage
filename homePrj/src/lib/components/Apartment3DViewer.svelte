<script>
  import { onMount } from 'svelte';
  import ThreeDViewer from './ThreeDViewer.svelte';
  import RoomNavigation from './RoomNavigation.svelte';

  export let width = 800;
  export let height = 600;
  export let showNavigation = true;
  export let showControls = true;

  let viewerRef;
  let currentRoom = 'living';
  let isAutoRotating = false;

  const rooms = [
    { 
      id: 'living', 
      name: '거실', 
      icon: '🛋️', 
      position: { x: 0, y: 3, z: 8 },
      lookAt: { x: 0, y: 0, z: 0 },
      description: '넓고 쾌적한 거실 공간'
    },
    { 
      id: 'kitchen', 
      name: '주방', 
      icon: '🍳', 
      position: { x: -6, y: 3, z: 0 },
      lookAt: { x: -3, y: 0, z: 0 },
      description: '모던한 주방 시설'
    },
    { 
      id: 'bedroom', 
      name: '침실', 
      icon: '🛏️', 
      position: { x: 6, y: 3, z: 0 },
      lookAt: { x: 3, y: 0, z: 0 },
      description: '편안한 침실 공간'
    },
    { 
      id: 'bathroom', 
      name: '화장실', 
      icon: '🚿', 
      position: { x: 0, y: 3, z: -6 },
      lookAt: { x: 0, y: 0, z: -3 },
      description: '깔끔한 화장실'
    }
  ];

  function handleRoomChange(event) {
    const { room, position } = event.detail;
    currentRoom = room.id;
    
    // 3D 뷰어의 카메라 위치를 해당 방으로 이동
    if (viewerRef) {
      // 카메라 애니메이션으로 부드럽게 이동
      animateCameraToRoom(room);
    }
  }

  function animateCameraToRoom(room) {
    // Three.js의 카메라 애니메이션은 ThreeDViewer 컴포넌트 내부에서 처리
    // 여기서는 이벤트를 전달하는 역할
    if (viewerRef && viewerRef.setCameraPosition) {
      viewerRef.setCameraPosition(room.position, room.lookAt);
    }
  }

  function resetView() {
    if (viewerRef && viewerRef.resetCamera) {
      viewerRef.resetCamera();
    }
  }

  function toggleAutoRotate() {
    isAutoRotating = !isAutoRotating;
    if (viewerRef && viewerRef.setAutoRotate) {
      viewerRef.setAutoRotate(isAutoRotating);
    }
  }
</script>

<div class="apartment-3d-viewer">
  <div class="viewer-header">
    <h2>3D 아파트 투어</h2>
    <p>마우스로 드래그하여 공간을 둘러보세요</p>
  </div>

  <div class="viewer-content">
    {#if showNavigation}
      <div class="navigation-panel">
        <RoomNavigation 
          {rooms} 
          {currentRoom}
          on:roomChange={handleRoomChange}
        />
        
        <div class="room-info">
          <h4>{rooms.find(r => r.id === currentRoom)?.name}</h4>
          <p>{rooms.find(r => r.id === currentRoom)?.description}</p>
        </div>
      </div>
    {/if}

    <div class="viewer-panel">
      <div class="viewer-container">
        <ThreeDViewer 
          bind:this={viewerRef}
          {width}
          {height}
          enableControls={showControls}
          autoRotate={false}
          modelPath=""
        />
      </div>

      <div class="viewer-controls">
        <button on:click={resetView} class="control-btn">
          🔄 전체보기
        </button>
        <button on:click={toggleAutoRotate} class="control-btn">
          {isAutoRotating ? '⏸️ 자동회전 중지' : '🔄 자동회전 시작'}
        </button>
      </div>
    </div>
  </div>

  <div class="viewer-instructions">
    <div class="instruction-item">
      <span class="icon">🖱️</span>
      <span>드래그: 회전</span>
    </div>
    <div class="instruction-item">
      <span class="icon">🔍</span>
      <span>휠: 줌</span>
    </div>
    <div class="instruction-item">
      <span class="icon">👆</span>
      <span>클릭: 방 선택</span>
    </div>
  </div>
</div>

<style>
  .apartment-3d-viewer {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background: #f8f9fa;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .viewer-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    text-align: center;
  }

  .viewer-header h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
  }

  .viewer-header p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }

  .viewer-content {
    display: flex;
    min-height: 600px;
  }

  .navigation-panel {
    width: 300px;
    background: white;
    padding: 20px;
    border-right: 1px solid #e0e0e0;
  }

  .room-info {
    margin-top: 20px;
    padding: 15px;
    background: #f8f9ff;
    border-radius: 8px;
    border-left: 4px solid #007bff;
  }

  .room-info h4 {
    margin: 0 0 8px 0;
    color: #007bff;
    font-size: 16px;
  }

  .room-info p {
    margin: 0;
    color: #666;
    font-size: 14px;
    line-height: 1.4;
  }

  .viewer-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .viewer-container {
    flex: 1;
    position: relative;
  }

  .viewer-controls {
    padding: 15px;
    background: white;
    border-top: 1px solid #e0e0e0;
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .control-btn {
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .control-btn:hover {
    background: #0056b3;
  }

  .viewer-instructions {
    background: #f8f9fa;
    padding: 15px;
    display: flex;
    justify-content: center;
    gap: 30px;
    border-top: 1px solid #e0e0e0;
  }

  .instruction-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
  }

  .instruction-item .icon {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    .viewer-content {
      flex-direction: column;
    }

    .navigation-panel {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #e0e0e0;
    }

    .viewer-instructions {
      flex-direction: column;
      gap: 10px;
      text-align: center;
    }
  }
</style>
