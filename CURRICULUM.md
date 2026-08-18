# React Native 실무 전환 커리큘럼

> 대상: React 웹 개발 경험자 → RN 실무 투입
> 환경: Expo SDK 57 / RN 0.86 / React 19.2 / expo-router / TypeScript strict
> 목표 프로젝트: 차량 후방카메라 + 동적 주차 가이드라인(보조선) 오버레이
> 기간: 4주 (하루 2~3시간) / 방식: **과제 중심** — 개념 설명 + 과제 → 직접 구현 → 코드 리뷰

---

## 왜 이 순서인가

목표 프로젝트를 기술로 분해하면 이렇습니다.

| 최종 프로젝트 요구 | 필요한 RN 역량 | 다루는 주차 |
|---|---|---|
| 카메라 영상이 화면 전체에 깔림 | 네이티브 뷰, 절대 위치 레이아웃, 종횡비 | 1주, 3주 |
| 그 위에 보조선이 겹쳐 그려짐 | z-index / absolute 오버레이, SVG·Skia 드로잉 | 1주, 3주 |
| 핸들 각도에 따라 보조선이 실시간으로 휨 | 60fps 애니메이션, Reanimated worklet, UI 스레드 | 3주 |
| 조향각·후진 신호가 차량에서 들어옴 | 센서/이벤트 스트림, 네이티브 모듈 브릿지 | 4주 |
| 가로 모드 고정, 저사양 기기에서 버벅이면 안 됨 | orientation, 렌더 최적화, 프로파일링 | 4주 |
| Expo Go로는 못 돌림 | dev build, 네이티브 코드 빌드 | 4주 |

1~2주는 이걸 하기 위한 **기본기**, 3~4주는 **목표 도메인 직결**입니다.

---

## 1주차 — 웹 React 개발자가 RN에서 깨지는 것들

핵심 질문: "React는 그대로인데, 왜 내 감각이 안 통하지?"

### Day 1 — 원시 컴포넌트와 StyleSheet
- `div/span/p` 없음 → `View`, `Text`만 존재. 텍스트는 **반드시** `Text` 안에.
- CSS 없음 → JS 객체 스타일. 단위 없음(=dp), 상속 없음(`Text` 일부 예외), 캐스케이딩 없음.
- `StyleSheet.create` vs 인라인 객체, 배열로 스타일 합성하는 관용구.
- `Pressable` / `onPress` (웹의 `onClick` 아님, `cursor`·`:hover` 개념 없음).
- **과제 1**: `src/app/explore.tsx`를 갈아엎고 프로필 카드 화면 만들기.

### Day 2 — Flexbox가 다르다
- `flexDirection` 기본값이 **`column`** (웹은 `row`). RN에서 가장 흔한 첫 버그.
- `flex: 1`의 의미, `flexGrow/Shrink/Basis`가 웹과 미묘하게 다른 지점.
- `position: 'absolute'`는 **부모 기준**이 기본. `zIndex`와 형제 순서.
- `overflow: hidden`의 Android 한계, `borderRadius` + 그림자 조합의 플랫폼 차이.
- **과제 2**: 카메라 오버레이 연습 — 배경 위에 절대 위치로 겹치는 HUD 레이아웃.

### Day 3 — 화면 크기, 안전 영역, 플랫폼 분기
- `useWindowDimensions()` (웹 미디어쿼리 대체), `PixelRatio`, 픽셀과 dp.
- `react-native-safe-area-context`의 `SafeAreaView` / `useSafeAreaInsets` — 노치·홈 인디케이터.
- `Platform.OS` / `Platform.select` / `.ios.tsx` `.android.tsx` 파일 분기.
- iOS/Android 실제 차이 목록: 그림자, 폰트, 리플, 스크롤 바운스, 상태바.
- **과제 3**: 과제 2 화면을 iOS/Android 양쪽에서 어긋남 없이 만들기 + 가로 모드 대응.

### Day 4 — 스크롤과 리스트
- `ScrollView`(전부 렌더) vs `FlatList`(가상화) 선택 기준.
- `keyExtractor`, `renderItem`, `getItemLayout`, `ListHeaderComponent`.
- 리렌더 지옥: `renderItem` 인라인 클로저, `React.memo`, 웹과 다른 비용 구조.
- `RefreshControl`, `onEndReached` 무한 스크롤.
- **과제 4**: 200개 로그 리스트 + 당겨서 새로고침 + 무한 스크롤.

### Day 5 — 이미지, 폰트, 애셋
- `expo-image` vs RN `Image`, `contentFit`, 캐싱, placeholder/transition.
- `require()` 정적 애셋 vs 원격 URI, `@2x/@3x` 해상도.
- `expo-font`로 커스텀 폰트, 스플래시 스크린 제어.
- **1주차 정리 과제**: 위 4개를 하나의 앱으로 합치기 + 코드 리뷰.

---

## 2주차 — 앱 구조: 네비게이션, 상태, 폼

### Day 6 — expo-router 기초
- 파일 기반 라우팅. `src/app/` 디렉터리 규칙, `_layout.tsx`, `index.tsx`.
- `Stack` / `Tabs` / `NativeTabs`(SDK 57), `Slot`.
- `Link`, `useRouter()`, `router.push/replace/back`, typed routes(이 프로젝트 활성화됨).
- 웹 라우팅과의 차이: **화면이 스택에 쌓여 살아있다**(언마운트 안 됨).

### Day 7 — 라우팅 심화
- 동적 라우트 `[id].tsx`, `useLocalSearchParams()`.
- 그룹 라우트 `(group)`, 모달 프레젠테이션, `useFocusEffect`.
- 딥링크 / URL scheme(`rnpractice://`) — 차량 앱에서 외부 트리거 받을 때 쓰임.
- **과제 5**: 목록 → 상세 → 모달 3단 네비게이션.

### Day 8 — 상태 관리와 데이터 페칭
- Context / Zustand / TanStack Query 중 실무 선택 기준.
- RN 특유 이슈: 앱 백그라운드 전환(`AppState`), 네트워크 상태, 화면 재진입 시 refetch.
- `expo-secure-store` / `AsyncStorage` — 토큰과 오프라인 캐시.
- **과제 6**: 공개 API 붙여서 로딩·에러·재시도·오프라인 캐시 처리.

### Day 9 — 폼과 키보드
- `TextInput`의 함정: `value/onChangeText`, `keyboardType`, `returnKeyType`, ref 포커스 이동.
- **키보드가 화면을 가리는 문제** — RN 실무 단골. `KeyboardAvoidingView`의 iOS/Android 차이.
- react-hook-form 연동, 유효성 검사, 접근성.
- **과제 7**: 5필드 설정 폼 + 키보드 완벽 대응.

### Day 10 — 디버깅과 개발 도구
- Dev menu, Fast Refresh의 상태 보존 규칙, LogBox.
- React DevTools / Hermes 디버거 / 네트워크 인스펙터.
- 소스맵과 크래시 로그 읽는 법, `adb logcat` / Xcode Console.
- **2주차 정리 과제** + 코드 리뷰.

---

## 3주차 — 목표 도메인 직행: 그리기, 애니메이션, 카메라

### Day 11 — Reanimated 4 기초
- 왜 `Animated`가 아니라 Reanimated인가: **JS 스레드 vs UI 스레드**.
- `useSharedValue`, `useAnimatedStyle`, `withTiming/withSpring`, **worklet**이란 무엇인가.
- 이 프로젝트에 왜 결정적인지: 조향각 60fps 반영은 JS 스레드로는 불가능.
- **과제 8**: 슬라이더 값에 따라 UI 스레드에서만 움직이는 인디케이터.

### Day 12 — 제스처
- `react-native-gesture-handler` Pan/Pinch/Tap, Reanimated와 결합.
- 터치 히트 영역, 스크롤 중첩 충돌 해결.
- **과제 9**: 드래그 + 핀치 줌 되는 뷰포트.

### Day 13 — 벡터 드로잉 (보조선의 핵심)
- `react-native-svg`: `Svg/Path/Line/Polygon`, 좌표계.
- `@shopify/react-native-skia`: 언제 SVG 대신 Skia를 써야 하는가(고빈도 갱신 = Skia).
- 원근 투영으로 주차 가이드라인 그리기 — 화면 좌표 ↔ 실세계 거리 매핑 개념.
- **과제 10**: 정적 이미지 위에 3단계 거리선(0.5m/1m/2m) 그리기.

### Day 14 — 카메라와 권한
- `expo-camera`의 `CameraView`, `useCameraPermissions()`.
- **중요한 한계**: expo-camera는 프레임 콜백/텍스처 접근 API가 없고 내장 카메라만 지원 → 실제 차량 카메라(USB/CAN/RTSP)는 **네이티브 뷰 모듈이 필요**함. 4주차에서 다룸.
- 권한 요청 UX, 거부/영구거부 처리, `app.json` 권한 설정.
- **과제 11**: 카메라 프리뷰 + 과제 10의 보조선 오버레이 합치기.

### Day 15 — 센서와 하드웨어 입력
- `expo-sensors`: 가속도계/자이로/회전벡터, 업데이트 주기 조절.
- 고빈도 이벤트를 Reanimated shared value로 흘려보내기(브릿지 부하 없이).
- **과제 12**: 기기 기울기 → 보조선 각도 실시간 반영.

---

## 4주차 — 실전: 네이티브, 성능, 배포

### Day 16 — Dev Build와 네이티브 프로젝트
- Expo Go의 한계, `expo-dev-client`, `npx expo run:android` / `run:ios`.
- `android/` `ios/` 폴더가 생겼을 때 무엇을 봐야 하는가, CNG(prebuild)와 config plugin.
- 네이티브 의존성 추가 시 트러블슈팅 흐름.

### Day 17 — Expo Modules API로 네이티브 모듈 만들기
- Kotlin/Swift로 모듈 작성, `create-expo-module --local`.
- **네이티브 뷰** 만들기 — 차량 카메라 SurfaceView를 RN에 노출하는 실제 패턴.
- 네이티브 → JS 이벤트 전송(조향각 스트림).
- **과제 13**: "가짜 차량 신호"를 내보내는 로컬 네이티브 모듈 작성.

### Day 18 — 성능
- 렌더 프로파일링, `react-native-performance`, Hermes.
- New Architecture(Fabric/TurboModules)가 뭘 바꿨는지.
- 저사양 기기 대응: 오버드로우, 불필요한 리렌더, 이미지 메모리.
- **과제 14**: 과제 11 화면을 프로파일링하고 프레임 드랍 제거.

### Day 19~20 — 캡스톤
**"후방카메라 주차 보조 시뮬레이터"**
- 가로 모드 고정 (`expo-screen-orientation`)
- 전체 화면 카메라 프리뷰
- 조향각에 따라 실시간으로 휘는 동적 가이드라인 (Skia + Reanimated worklet)
- 거리 구간별 색상(초록/노랑/빨강)
- 조향각 입력 소스 전환: 슬라이더 ↔ 기기 자이로 ↔ 네이티브 모듈 목(mock)
- 후진 기어 on/off 상태 전환 애니메이션
- 60fps 유지 검증

최종 코드 리뷰 + 실무 투입 체크리스트.

---

## 진행 규칙

1. 과제는 **직접** 작성합니다. 막히면 코드를 달라고 하지 말고 "어디서 왜 막혔는지"를 말해주세요.
2. 각 과제는 완료 기준(Acceptance Criteria)이 명시됩니다. 다 만족하면 리뷰 요청.
3. 리뷰는 ① 동작 ② RN 관용구 ③ 성능 ④ 플랫폼 차이 순으로 봅니다.
4. 매 과제마다 **"웹이었다면 어떻게 했을까 / RN은 왜 다른가"**를 한 줄로 적어주세요. 전환 속도가 여기서 갈립니다.
5. 코드를 쓰기 전 항상 https://docs.expo.dev/versions/v57.0.0/ 를 봅니다. RN 생태계는 블로그·구버전 문서가 오염돼 있습니다.

## 진도표

- [x] Day 1
- [x] Day 2
- [x] Day 3
- [x] Day 4
- [x] Day 5 (1주차 정리)
- [ ] Day 6
- [ ] Day 7
- [ ] Day 8
- [ ] Day 9
- [ ] Day 10 (2주차 정리)
- [ ] Day 11
- [ ] Day 12
- [ ] Day 13
- [ ] Day 14
- [ ] Day 15
- [ ] Day 16
- [ ] Day 17
- [ ] Day 18
- [ ] Day 19~20 (캡스톤)
