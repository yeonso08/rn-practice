# 학습 진행 상태

> **이 파일이 세션 이어하기의 기준점입니다.**
> 다른 PC에서 시작할 때, 그리고 새 Claude Code 세션을 열 때 이 파일을 먼저 읽습니다.
> 매 학습 세션이 끝날 때 반드시 갱신하고 커밋·푸시합니다.

---

## 📍 현재 위치

| 항목 | 값 |
|---|---|
| **현재 Day** | Day 6 — expo-router 기초 (1주차 완료, 2주차 시작) |
| **상태** | 1주차(Day1~5) 전부 완료 및 리뷰 통과 |
| **마지막 갱신** | 2026-08-18 |
| **다음 할 일** | Day 6 개념 설명부터 시작 |

`src/app/explore.tsx` = 프로필 카드 + HUD absolute 오버레이 + expo-image(원격/로컬) + useFonts.
`src/app/scroll.tsx` = FlatList 200개 로그 + 당겨서 새로고침 + 무한스크롤.
`src/app/index.tsx`는 아직 초기 테스트 상태(`dd`) — 이후 Day에서 채울 것.

> ⚠️ **튜터에게**: 사용자가 설명이 길면 힘들어합니다. **짧고 간결하게** 답할 것.
> 표·비유 남발하지 말고 결론부터. 물어본 것만 답하기.

---

## ✅ 완료한 Day

<!-- 완료할 때마다 아래에 추가. 리뷰에서 지적받은 핵심만 짧게 남길 것 -->

- **Day 1**: 프로필 카드(`explore.tsx`). 스타일 배열 합성, `Pressable`의 `{pressed}` 구조분해 실수(안 하면 항상 truthy) 겪음.
- **Day 2**: HUD absolute 오버레이. `position:absolute`는 `top/left/right/bottom` 오프셋 명시 필요(안 주면 위치 불안정). `zIndex`는 겹치는 요소 있어야 눈에 보임.
- **Day 3**: `SafeAreaView`(빈 태그로 넣으면 무효 — 자식을 감싸야 함), `Platform.select`로 테두리색 분기, iOS/Android 그림자 속성 둘 다 명시.
- **Day 4**: `FlatList` + `RefreshControl`(`refreshing`/`onRefresh` 내장) + `onEndReached` 무한스크롤. `renderItem` 인라인 함수는 지금 스케일에선 괜찮지만 원칙적으로 `useCallback` 권장.
- **Day 5**: `expo-image`(RN 기본 `Image` 대체, `source`/`contentFit`이 각각 다른 자리), `useFonts` 로딩 게이팅(`if (!loaded) return null`). **디버깅 교훈**: 화면 요소가 안 보일 때 레이아웃(스크롤 없이 화면 밖으로 밀림)과 색상(흰 로고+흰 배경) 둘 다 의심할 것.

---

## 📝 개념 노트

세션 중에 배운 것 중 **다시 안 볼 것 같은데 나중에 반드시 다시 찾게 될 것**만 적습니다.

### Day 1

- **dp = 논리 픽셀.** 웹 CSS의 `px`와 사실상 동일한 감각. 물리 픽셀 아님 (`물리px = dp × DPR`).
  - 물리 픽셀이 필요한 순간은 두 곳: `PixelRatio.getPixelSizeForLayoutSize()` (네이티브 버퍼 좌표 환산), `StyleSheet.hairlineWidth` (1픽셀 구분선).
  - 소수점 dp는 물리 픽셀 반올림 때문에 1px 틈이 생김 → 보조선 그릴 때 `PixelRatio.roundToNearestPixel()` 필요.
  - 화면의 **dp 폭 자체**가 기기마다 다름 (360~412, 차량 헤드유닛은 1000+). 고정 dp보다 flex/% 우선.
- 모든 문자열은 `<Text>` 안에만. `{count && <Foo/>}`에서 `count === 0`이면 **앱이 크래시**함 → `{count > 0 && ...}`.
- 스타일 합성 관용구: `style={[base, cond && variant, propStyle]}` — 뒤가 이김, falsy는 무시.
- CSS와 다른 점 3가지: 상속 없음 / 셀렉터·캐스케이딩 없음 / 단위 없음.

### Day 2~5

- `flexDirection` 기본값 **column**(웹은 row). `flexShrink` 기본값 **0**(웹은 1) → 콘텐츠가 화면보다 길어도 안 줄어들고, 스크롤 없는 화면이면 그냥 화면 밖으로 잘림(에러 없음). `explore.tsx`에서 실제로 겪음 → `ScrollView`로 해결.
- `position:'absolute'`는 항상 **직계 부모** 기준(웹처럼 조상 타고 올라가지 않음). `top/left/right/bottom` 오프셋 명시 안 하면 위치 불안정.
- `SafeAreaView`(`react-native-safe-area-context`)는 **화면마다 개별 적용**이 맞는 방향. 탭 네비게이터 루트에 통째로 감싸면: 네이티브 탭바가 이미 자체적으로 안전영역 처리하는데 이중으로 밀리고, 최종 프로젝트의 카메라 풀스크린 화면은 애초에 안전영역 패딩이 없어야 함.
- `Platform.select({ios, android})` / 그림자는 `shadow*`(iOS)+`elevation`(Android) 둘 다 같이 넣으면 각자 알아서 읽음.
- `FlatList`: `refreshing`/`onRefresh`로 당겨새로고침 내장 지원(별도 `RefreshControl` 컴포넌트로 안 감싸도 됨). `onEndReached`+`onEndReachedThreshold`로 무한스크롤.
- `expo-image`의 `source`(이미지 데이터)와 `contentFit`(맞춤 방식)은 `style`이 아니라 **별도 prop**. `width/height` 없으면 0크기.
- 커스텀 폰트(`useFonts`)는 로딩이 진짜 비동기(디스크 파일이어도 OS 등록 과정이 필요) → 로드 전 렌더링하면 fallback 폰트로 잠깐 보였다가 바뀌는 레이아웃 튐 발생 → `if (!loaded) return null`로 게이팅.

### 도구·환경 (Day 1에서 실제로 겪은 것)

- **expo-router는 라우트 파일의 `export default`를 화면으로 씀.** named export는 무시 → 화면 안 뜸.
- **`npm run android` = `expo start --android`.** dev 서버는 하나뿐. `expo start`랑 같이 켜면 서버가 2개(8081/8082) 떠서 갱신이 꼬임. **하나만 켤 것.**
- `expo start`(JS 번들만, 즉시) ≠ `expo run:android`(네이티브 컴파일, 수 분). 4주차부터 후자 필요.
- 서버를 재시작해도 **이미 켜져 있던 Expo Go는 옛 번들을 붙들고 있음.** 터미널에서 `r` 눌러 리로드.
- Fast Refresh는 기본 ON. 컴포넌트만 export하는 파일은 state 유지, 비컴포넌트도 export하면 state 리셋.
  `useEffect`/`useMemo`는 Fast Refresh 중 의존성 무시하고 재실행 → **cleanup 꼭 작성** (3주차 센서 구독 때 물림).
- 반응형: 폰 폭은 360~430dp로 좁아서 breakpoint 거의 불필요. **고정 숫자 폭만 안 쓰면 됨**
  (`width: 400` ❌ → `'85%'` / `flex: 1` / `maxWidth`). 구조가 달라져야 할 때만 `useWindowDimensions()`.
- `app.json`은 Fast Refresh 안 됨 → 서버 재시작 필요.

---

## ❓ 미해결 질문

<!-- 넘어가긴 했는데 찝찝한 것들. 나중에 답 찾으면 개념 노트로 옮기고 여기서 지울 것 -->

- **폰 AVD 미생성.** 현재 `Pixel_Tablet`(1280×800dp) 하나뿐이라 폰(≈412dp) 감각이 안 잡힘.
  Day 2~3 레이아웃 들어가기 전에 만드는 게 좋음. Apple Silicon이므로 **`arm64-v8a`** 이미지 필수.
- `app.json`의 `orientation`을 `portrait` → `default`로 바꿈 (태블릿 레터박스 제거용).
  최종 프로젝트는 **가로 고정**이라 3~4주차에 다시 조정 예정.

---

## 🎯 최종 목표 리마인더

차량 후방카메라 + 조향각 연동 동적 주차 가이드라인 오버레이.
→ 카메라 네이티브 뷰 / Skia 드로잉 / Reanimated worklet 60fps / 센서·네이티브 모듈 브릿지 / 가로 모드 / 저사양 최적화.

전체 커리큘럼은 [CURRICULUM.md](./CURRICULUM.md) 참고.
