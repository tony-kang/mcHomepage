# 3D 모델 파일 저장소

이 디렉토리는 3D 아파트 투어에서 사용할 3D 모델 파일들을 저장하는 곳입니다.

## 지원하는 파일 형식

### 1. GLTF/GLB (권장)
- **장점**: 최신 표준, 텍스처와 애니메이션 지원, 파일 크기 최적화
- **파일 확장자**: `.gltf`, `.glb`
- **예시**: `apartment.gltf`, `room.glb`

### 2. OBJ
- **장점**: 널리 사용되는 형식, 간단한 구조
- **단점**: 텍스처와 애니메이션 지원 제한
- **파일 확장자**: `.obj`
- **예시**: `apartment.obj`

### 3. FBX (제한적 지원)
- **주의**: 별도 로더 설치 필요
- **파일 확장자**: `.fbx`

## 파일 배치 방법

1. 3D 모델 파일을 이 디렉토리에 복사
2. `Apartment3DViewer.svelte`에서 `modelPath` 속성 수정
3. 예시:
   ```svelte
   <ThreeDViewer modelPath="/models/your-model.gltf" />
   ```

## 3D 모델 제작 도구

### 무료 도구
- **Blender**: https://www.blender.org/
- **SketchUp Free**: https://www.sketchup.com/
- **Tinkercad**: https://www.tinkercad.com/

### 온라인 모델 다운로드
- **Sketchfab**: https://sketchfab.com/
- **TurboSquid**: https://www.turbosquid.com/
- **CGTrader**: https://www.cgtrader.com/

## 모델 최적화 팁

1. **파일 크기**: 웹용으로는 10MB 이하 권장
2. **폴리곤 수**: 모바일 호환성을 위해 50,000 폴리곤 이하
3. **텍스처**: 2048x2048 이하 권장
4. **GLTF 변환**: Blender에서 File > Export > glTF 2.0 사용

## 예제 파일 구조

```
static/models/
├── apartment.gltf          # 전체 아파트 모델
├── apartment.bin           # GLTF 바이너리 데이터
├── textures/               # 텍스처 파일들
│   ├── wall.jpg
│   ├── floor.jpg
│   └── furniture.jpg
└── rooms/                  # 방별 모델들
    ├── living.gltf
    ├── kitchen.gltf
    ├── bedroom.gltf
    └── bathroom.gltf
```
