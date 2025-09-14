<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

  export let width = 800;
  export let height = 600;
  export let modelPath = '';
  export let backgroundColor = 0xf0f0f0;
  export let enableControls = true;
  export let autoRotate = false;

  let container;
  let scene, camera, renderer, controls;
  let model;
  let isLoading = false;
  let loadingProgress = 0;

  onMount(() => {
    initThreeJS();
    loadModel();
    animate();
  });

  onDestroy(() => {
    if (renderer) {
      renderer.dispose();
    }
  });

  function initThreeJS() {
    // Scene 생성
    scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    // Camera 생성
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);

    // Renderer 생성
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controls 설정
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 2.0;
    }

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 그리드 헬퍼 (선택사항)
    const gridHelper = new THREE.GridHelper(20, 20);
    scene.add(gridHelper);
  }

  function loadModel() {
    if (!modelPath) {
      // 기본 아파트 구조 생성
      createDefaultRoom();
      return;
    }

    // 파일 확장자에 따라 적절한 로더 선택
    const extension = modelPath.split('.').pop().toLowerCase();
    
    if (extension === 'gltf' || extension === 'glb') {
      loadGLTFModel();
    } else if (extension === 'obj') {
      loadOBJModel();
    } else if (extension === 'fbx') {
      loadFBXModel();
    } else {
      console.warn('지원하지 않는 3D 모델 형식:', extension);
      createDefaultRoom();
    }
  }

  function loadGLTFModel() {
    isLoading = true;
    loadingProgress = 0;
    
    // GLTF 로더로 3D 모델 로드
    const loader = new THREE.GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        
        // 모델에 그림자 설정
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(model);
        isLoading = false;
        console.log('GLTF 모델 로드 완료');
      },
      (progress) => {
        loadingProgress = (progress.loaded / progress.total * 100);
        console.log('GLTF 로딩 진행률:', loadingProgress + '%');
      },
      (error) => {
        console.error('GLTF 모델 로드 실패:', error);
        isLoading = false;
        createDefaultRoom();
      }
    );
  }

  function loadOBJModel() {
    // OBJ 로더로 3D 모델 로드
    const loader = new THREE.OBJLoader();
    loader.load(
      modelPath,
      (object) => {
        model = object;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        
        // OBJ 모델에 기본 재질 적용
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshLambertMaterial({ color: 0xcccccc });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        scene.add(model);
        console.log('OBJ 모델 로드 완료');
      },
      (progress) => {
        console.log('OBJ 로딩 진행률:', (progress.loaded / progress.total * 100) + '%');
      },
      (error) => {
        console.error('OBJ 모델 로드 실패:', error);
        createDefaultRoom();
      }
    );
  }

  function loadFBXModel() {
    // FBX 로더로 3D 모델 로드 (별도 로더 필요)
    console.warn('FBX 로더는 별도 설치가 필요합니다: npm install three/examples/jsm/loaders/FBXLoader');
    createDefaultRoom();
  }

  function createDefaultRoom() {
    // 상세한 아파트 구조 생성
    const apartment = new THREE.Group();

    // 바닥 (전체)
    createFloor(apartment);
    
    // 벽들 (방별로 구분)
    createWalls(apartment);
    
    // 문과 창문
    createDoorsAndWindows(apartment);
    
    // 가구들
    createFurniture(apartment);

    scene.add(apartment);
  }

  function createFloor(apartment) {
    // 전체 바닥
    const mainFloorGeometry = new THREE.PlaneGeometry(12, 12);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5DC });
    const mainFloor = new THREE.Mesh(mainFloorGeometry, floorMaterial);
    mainFloor.rotation.x = -Math.PI / 2;
    mainFloor.receiveShadow = true;
    apartment.add(mainFloor);

    // 거실 바닥 (카펫)
    const livingFloorGeometry = new THREE.PlaneGeometry(6, 6);
    const carpetMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const carpet = new THREE.Mesh(livingFloorGeometry, carpetMaterial);
    carpet.rotation.x = -Math.PI / 2;
    carpet.position.set(-3, 0.01, 3);
    carpet.receiveShadow = true;
    apartment.add(carpet);

    // 주방 바닥 (타일)
    const kitchenFloorGeometry = new THREE.PlaneGeometry(4, 4);
    const tileMaterial = new THREE.MeshLambertMaterial({ color: 0x708090 });
    const tile = new THREE.Mesh(kitchenFloorGeometry, tileMaterial);
    tile.rotation.x = -Math.PI / 2;
    tile.position.set(-3, 0.01, -1);
    apartment.add(tile);

    // 침실 바닥 (나무)
    const bedroomFloorGeometry = new THREE.PlaneGeometry(4, 6);
    const woodMaterial = new THREE.MeshLambertMaterial({ color: 0xD2691E });
    const wood = new THREE.Mesh(bedroomFloorGeometry, woodMaterial);
    wood.rotation.x = -Math.PI / 2;
    wood.position.set(3, 0.01, 0);
    apartment.add(wood);
  }

  function createWalls(apartment) {
    const wallHeight = 3;
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xF5F5DC });
    
    // 외벽들
    const outerWalls = [
      { pos: [0, wallHeight/2, -6], size: [12, wallHeight, 0.2], rot: [0, 0, 0] }, // 뒷벽
      { pos: [0, wallHeight/2, 6], size: [12, wallHeight, 0.2], rot: [0, 0, 0] },  // 앞벽
      { pos: [-6, wallHeight/2, 0], size: [0.2, wallHeight, 12], rot: [0, 0, 0] }, // 왼쪽벽
      { pos: [6, wallHeight/2, 0], size: [0.2, wallHeight, 12], rot: [0, 0, 0] }   // 오른쪽벽
    ];

    outerWalls.forEach(wall => {
      const geometry = new THREE.BoxGeometry(...wall.size);
      const mesh = new THREE.Mesh(geometry, wallMaterial);
      mesh.position.set(...wall.pos);
      mesh.castShadow = true;
      apartment.add(mesh);
    });

    // 내부 벽들 (방 구분)
    const innerWalls = [
      { pos: [0, wallHeight/2, -2], size: [6, wallHeight, 0.1], rot: [0, 0, 0] }, // 주방-거실 구분
      { pos: [2, wallHeight/2, 0], size: [0.1, wallHeight, 8], rot: [0, 0, 0] },  // 침실 구분
      { pos: [0, wallHeight/2, -4], size: [4, wallHeight, 0.1], rot: [0, 0, 0] }  // 화장실 구분
    ];

    innerWalls.forEach(wall => {
      const geometry = new THREE.BoxGeometry(...wall.size);
      const mesh = new THREE.Mesh(geometry, wallMaterial);
      mesh.position.set(...wall.pos);
      mesh.castShadow = true;
      apartment.add(mesh);
    });
  }

  function createDoorsAndWindows(apartment) {
    // 문
    const doorGeometry = new THREE.BoxGeometry(0.1, 2.2, 0.8);
    const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    
    // 거실-주방 문
    const door1 = new THREE.Mesh(doorGeometry, doorMaterial);
    door1.position.set(-0.5, 1.1, -2);
    apartment.add(door1);

    // 침실 문
    const door2 = new THREE.Mesh(doorGeometry, doorMaterial);
    door2.position.set(2, 1.1, -2);
    apartment.add(door2);

    // 화장실 문
    const door3 = new THREE.Mesh(doorGeometry, doorMaterial);
    door3.position.set(-1, 1.1, -3.5);
    apartment.add(door3);

    // 창문들
    const windowGeometry = new THREE.BoxGeometry(0.05, 1.5, 2);
    const windowMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.7 
    });

    // 거실 창문
    const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
    window1.position.set(-6, 1.5, 3);
    apartment.add(window1);

    // 침실 창문
    const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
    window2.position.set(6, 1.5, 0);
    apartment.add(window2);
  }

  function createFurniture(room) {
    // 거실 가구
    createLivingRoomFurniture(room);
    
    // 주방 가구
    createKitchenFurniture(room);
    
    // 침실 가구
    createBedroomFurniture(room);
    
    // 화장실 가구
    createBathroomFurniture(room);
  }

  function createLivingRoomFurniture(room) {
    // L자 소파
    const sofaGeometry = new THREE.BoxGeometry(3, 0.8, 1.2);
    const sofaMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);
    sofa.position.set(-2, 0.4, 2);
    sofa.castShadow = true;
    room.add(sofa);

    // 소파 팔걸이
    const armrestGeometry = new THREE.BoxGeometry(0.3, 0.8, 1.2);
    const armrest = new THREE.Mesh(armrestGeometry, sofaMaterial);
    armrest.position.set(-3.5, 0.4, 2);
    armrest.castShadow = true;
    room.add(armrest);

    // 커피 테이블
    const tableGeometry = new THREE.BoxGeometry(1.5, 0.1, 1);
    const tableMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, 0.5, 2);
    table.castShadow = true;
    room.add(table);

    // 테이블 다리들
    for (let i = 0; i < 4; i++) {
      const legGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
      const leg = new THREE.Mesh(legGeometry, tableMaterial);
      const x = (i % 2) * 1.3 - 0.65;
      const z = Math.floor(i / 2) * 0.8 - 0.4;
      leg.position.set(x, 0.2, z);
      leg.castShadow = true;
      room.add(leg);
    }

    // TV 스탠드
    const tvStandGeometry = new THREE.BoxGeometry(2.5, 0.6, 0.8);
    const tvStandMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const tvStand = new THREE.Mesh(tvStandGeometry, tvStandMaterial);
    tvStand.position.set(0, 0.3, -4.5);
    tvStand.castShadow = true;
    room.add(tvStand);

    // TV
    const tvGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
    const tvMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const tv = new THREE.Mesh(tvGeometry, tvMaterial);
    tv.position.set(0, 1.2, -4.5);
    room.add(tv);

    // 거실 조명
    const lightGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const lightMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.3
    });
    const light = new THREE.Mesh(lightGeometry, lightMaterial);
    light.position.set(0, 2.8, 0);
    room.add(light);
  }

  function createKitchenFurniture(room) {
    // 싱크대 캐비닛
    const sinkCabinetGeometry = new THREE.BoxGeometry(2, 0.9, 0.6);
    const cabinetMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const sinkCabinet = new THREE.Mesh(sinkCabinetGeometry, cabinetMaterial);
    sinkCabinet.position.set(-3, 0.45, 0);
    sinkCabinet.castShadow = true;
    room.add(sinkCabinet);

    // 싱크대 상판
    const sinkTopGeometry = new THREE.BoxGeometry(2, 0.05, 0.6);
    const sinkTopMaterial = new THREE.MeshLambertMaterial({ color: 0x708090 });
    const sinkTop = new THREE.Mesh(sinkTopGeometry, sinkTopMaterial);
    sinkTop.position.set(-3, 0.925, 0);
    room.add(sinkTop);

    // 싱크대 구멍
    const sinkHoleGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16);
    const sinkHoleMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const sinkHole = new THREE.Mesh(sinkHoleGeometry, sinkHoleMaterial);
    sinkHole.position.set(-3, 0.9, 0);
    room.add(sinkHole);

    // 냉장고
    const fridgeGeometry = new THREE.BoxGeometry(0.8, 1.8, 0.6);
    const fridgeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const fridge = new THREE.Mesh(fridgeGeometry, fridgeMaterial);
    fridge.position.set(-4.5, 0.9, 0);
    fridge.castShadow = true;
    room.add(fridge);

    // 냉장고 손잡이
    const handleGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.1);
    const handleMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(-4.1, 0.9, 0);
    room.add(handle);

    // 가스레인지 캐비닛
    const stoveCabinetGeometry = new THREE.BoxGeometry(1.5, 0.9, 0.6);
    const stoveCabinet = new THREE.Mesh(stoveCabinetGeometry, cabinetMaterial);
    stoveCabinet.position.set(-1.5, 0.45, 0);
    stoveCabinet.castShadow = true;
    room.add(stoveCabinet);

    // 가스레인지 상판
    const stoveTopGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.6);
    const stoveTopMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const stoveTop = new THREE.Mesh(stoveTopGeometry, stoveTopMaterial);
    stoveTop.position.set(-1.5, 0.925, 0);
    room.add(stoveTop);

    // 가스레인지 버너들
    for (let i = 0; i < 4; i++) {
      const burnerGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16);
      const burnerMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
      const burner = new THREE.Mesh(burnerGeometry, burnerMaterial);
      const x = (i % 2) * 0.6 - 0.3;
      const z = Math.floor(i / 2) * 0.3 - 0.15;
      burner.position.set(-1.5 + x, 0.94, z);
      room.add(burner);
    }

    // 주방 조명
    const kitchenLightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const kitchenLightMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.2
    });
    const kitchenLight = new THREE.Mesh(kitchenLightGeometry, kitchenLightMaterial);
    kitchenLight.position.set(-2.5, 2.8, 0);
    room.add(kitchenLight);
  }

  function createBedroomFurniture(room) {
    // 침대 프레임
    const bedFrameGeometry = new THREE.BoxGeometry(2, 0.1, 3);
    const bedFrameMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const bedFrame = new THREE.Mesh(bedFrameGeometry, bedFrameMaterial);
    bedFrame.position.set(3, 0.05, -2);
    bedFrame.castShadow = true;
    room.add(bedFrame);

    // 침대 매트리스
    const mattressGeometry = new THREE.BoxGeometry(1.8, 0.3, 2.8);
    const mattressMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(3, 0.25, -2);
    mattress.castShadow = true;
    room.add(mattress);

    // 침대 헤드보드
    const headboardGeometry = new THREE.BoxGeometry(2, 1, 0.1);
    const headboardMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const headboard = new THREE.Mesh(headboardGeometry, headboardMaterial);
    headboard.position.set(3, 0.6, -3.4);
    headboard.castShadow = true;
    room.add(headboard);

    // 옷장
    const wardrobeGeometry = new THREE.BoxGeometry(1.5, 2, 0.6);
    const wardrobeMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const wardrobe = new THREE.Mesh(wardrobeGeometry, wardrobeMaterial);
    wardrobe.position.set(4.5, 1, 0);
    wardrobe.castShadow = true;
    room.add(wardrobe);

    // 옷장 문들
    for (let i = 0; i < 2; i++) {
      const doorGeometry = new THREE.BoxGeometry(0.7, 1.8, 0.05);
      const doorMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
      const door = new THREE.Mesh(doorGeometry, doorMaterial);
      door.position.set(4.5, 0.9, 0.25 + i * 0.1);
      room.add(door);
    }

    // 책상
    const deskGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.6);
    const deskMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(3, 0.4, 2);
    desk.castShadow = true;
    room.add(desk);

    // 책상 의자
    const chairGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.5);
    const chairMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const chair = new THREE.Mesh(chairGeometry, chairMaterial);
    chair.position.set(3, 0.4, 2.8);
    chair.castShadow = true;
    room.add(chair);

    // 침실 조명
    const bedroomLightGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const bedroomLightMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFFD700,
      emissive: 0xFFD700,
      emissiveIntensity: 0.2
    });
    const bedroomLight = new THREE.Mesh(bedroomLightGeometry, bedroomLightMaterial);
    bedroomLight.position.set(3, 2.8, -1);
    room.add(bedroomLight);
  }

  function createBathroomFurniture(room) {
    // 변기
    const toiletGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.6);
    const toiletMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const toilet = new THREE.Mesh(toiletGeometry, toiletMaterial);
    toilet.position.set(0, 0.4, -3);
    toilet.castShadow = true;
    room.add(toilet);

    // 변기 시트
    const seatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    const seatMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 0.8, -3);
    room.add(seat);

    // 세면대 캐비닛
    const sinkCabinetGeometry = new THREE.BoxGeometry(1.2, 0.8, 0.6);
    const cabinetMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const sinkCabinet = new THREE.Mesh(sinkCabinetGeometry, cabinetMaterial);
    sinkCabinet.position.set(-1.5, 0.4, -3);
    sinkCabinet.castShadow = true;
    room.add(sinkCabinet);

    // 세면대 상판
    const sinkTopGeometry = new THREE.BoxGeometry(1.2, 0.05, 0.6);
    const sinkTopMaterial = new THREE.MeshLambertMaterial({ color: 0x708090 });
    const sinkTop = new THREE.Mesh(sinkTopGeometry, sinkTopMaterial);
    sinkTop.position.set(-1.5, 0.825, -3);
    room.add(sinkTop);

    // 세면대 구멍
    const sinkHoleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 16);
    const sinkHoleMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const sinkHole = new THREE.Mesh(sinkHoleGeometry, sinkHoleMaterial);
    sinkHole.position.set(-1.5, 0.8, -3);
    room.add(sinkHole);

    // 욕조
    const bathtubGeometry = new THREE.BoxGeometry(1.8, 0.6, 0.8);
    const bathtubMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
    const bathtub = new THREE.Mesh(bathtubGeometry, bathtubMaterial);
    bathtub.position.set(1.5, 0.3, -3);
    bathtub.castShadow = true;
    room.add(bathtub);

    // 욕조 내부
    const bathtubInsideGeometry = new THREE.BoxGeometry(1.6, 0.4, 0.6);
    const bathtubInsideMaterial = new THREE.MeshLambertMaterial({ color: 0x87CEEB });
    const bathtubInside = new THREE.Mesh(bathtubInsideGeometry, bathtubInsideMaterial);
    bathtubInside.position.set(1.5, 0.4, -3);
    room.add(bathtubInside);

    // 샤워기
    const showerGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16);
    const showerMaterial = new THREE.MeshLambertMaterial({ color: 0x708090 });
    const shower = new THREE.Mesh(showerGeometry, showerMaterial);
    shower.position.set(1.5, 1.5, -3);
    shower.castShadow = true;
    room.add(shower);

    // 화장실 조명
    const bathroomLightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const bathroomLightMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFFFFFF,
      emissive: 0xFFFFFF,
      emissiveIntensity: 0.3
    });
    const bathroomLight = new THREE.Mesh(bathroomLightGeometry, bathroomLightMaterial);
    bathroomLight.position.set(0, 2.8, -3);
    room.add(bathroomLight);
  }

  function animate() {
    requestAnimationFrame(animate);
    
    if (controls) {
      controls.update();
    }
    
    renderer.render(scene, camera);
  }

  // 외부에서 호출할 수 있는 메서드들
  export function resetCamera() {
    if (camera && controls) {
      camera.position.set(5, 5, 5);
      controls.reset();
    }
  }

  export function setAutoRotate(enabled) {
    autoRotate = enabled;
    if (controls) {
      controls.autoRotate = enabled;
    }
  }

  export function setBackgroundColor(color) {
    if (scene) {
      scene.background = new THREE.Color(color);
    }
  }

  export function setCameraPosition(targetPosition, lookAtPosition = { x: 0, y: 0, z: 0 }) {
    if (camera && controls) {
      // 부드러운 카메라 이동을 위한 애니메이션
      const startPosition = camera.position.clone();
      const endPosition = new THREE.Vector3(
        targetPosition.x,
        targetPosition.y,
        targetPosition.z
      );
      
      // 카메라가 바라볼 위치 설정
      const lookAt = new THREE.Vector3(
        lookAtPosition.x,
        lookAtPosition.y,
        lookAtPosition.z
      );
      
      // 애니메이션 시작
      animateCamera(startPosition, endPosition, lookAt);
    }
  }

  function animateCamera(startPos, endPos, lookAt) {
    const duration = 1000; // 1초
    const startTime = Date.now();
    
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeInOutCubic 함수로 부드러운 애니메이션
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      // 카메라 위치 보간
      camera.position.lerpVectors(startPos, endPos, easeProgress);
      
      // 카메라가 대상을 바라보도록 설정
      camera.lookAt(lookAt);
      controls.target.copy(lookAt);
      controls.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    animate();
  }
</script>

<div class="three-d-viewer">
  <div bind:this={container} class="viewer-container"></div>
  
  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
      <div class="loading-text">3D 모델 로딩 중...</div>
      <div class="loading-progress">
        <div class="progress-bar" style="width: {loadingProgress}%"></div>
      </div>
      <div class="loading-percentage">{Math.round(loadingProgress)}%</div>
    </div>
  {/if}
  
  <div class="controls-panel">
    <button on:click={resetCamera}>카메라 리셋</button>
    <button on:click={() => setAutoRotate(!autoRotate)}>
      {autoRotate ? '⏸️ 자동회전 중지' : '🔄 자동회전 시작'}
    </button>
  </div>
</div>

<style>
  .three-d-viewer {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .viewer-container {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .controls-panel {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
  }

  .controls-panel button {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.2s;
  }

  .controls-panel button:hover {
    background: rgba(255, 255, 255, 1);
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    color: white;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-text {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .loading-progress {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .progress-bar {
    height: 100%;
    background: #007bff;
    transition: width 0.3s ease;
  }

  .loading-percentage {
    font-size: 14px;
    opacity: 0.8;
  }
</style>
