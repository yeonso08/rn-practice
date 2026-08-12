# 새 PC에서 이어서 하기

회사 ↔ 집 등 다른 환경에서 학습을 이어갈 때의 절차입니다.

## 1. 최초 1회 — 환경 준비

### 공통
- **Node 22.13 이상** (Expo SDK 57 최소 요구사항). 이 저장소는 `.nvmrc`로 `24.19.0`을 고정합니다.
  ```bash
  nvm install    # .nvmrc 읽어서 설치
  nvm use
  ```
- Git, 그리고 `gh` CLI (권장)

### Android (Windows / macOS 공통)
- Android Studio 설치 → SDK Platform **API 36** (SDK 57 `compileSdkVersion`)
- AVD(에뮬레이터) 생성
- `ANDROID_HOME` 환경변수 설정, `platform-tools`를 PATH에 추가
- 확인: `adb devices`

### iOS (macOS 전용)
- **Xcode 26.4 이상** (SDK 57 요구사항), iOS 16.4+ 시뮬레이터
- 확인: `xcrun simctl list devices`

> Windows PC에서는 iOS를 돌릴 수 없습니다. 해당 환경에서는 Android로만 진행하고, macOS에 돌아왔을 때 iOS 확인 과제를 몰아서 처리하세요.

## 2. 매번 — 작업 시작할 때

```bash
git pull
npm ci          # package-lock.json 기준 정확히 동일한 의존성 설치
npm run android # 또는 npm run ios
```

`npm install`이 아니라 **`npm ci`** 를 쓰세요. lock 파일을 그대로 재현하므로 환경 간 버전 차이가 생기지 않습니다.

그다음 Claude Code 세션을 열고:

```
PROGRESS.md 읽고 이어서 진행해줘
```

## 3. 매번 — 작업 끝낼 때

**이걸 빼먹으면 다른 PC에서 맥락이 끊깁니다.**

```bash
# 1) PROGRESS.md 갱신 (현재 위치 / 개념 노트 / 미해결 질문)
# 2) 커밋 & 푸시
git add -A
git commit -m "day1: 프로필 카드 과제"
git push
```

Claude에게 `"오늘 여기까지. PROGRESS.md 갱신하고 커밋해줘"` 라고 하면 처리합니다.

## 4. 동기화되는 것 / 안 되는 것

| | 동기화 | 비고 |
|---|---|---|
| 소스 코드 | ✅ | git |
| 커리큘럼·진도·개념 노트 | ✅ | `CURRICULUM.md`, `PROGRESS.md` |
| Claude 튜터 역할 설정 | ✅ | `AGENTS.md` (`CLAUDE.md`가 참조) |
| 의존성 버전 | ✅ | `package-lock.json` + `npm ci` |
| Node 버전 | ✅ | `.nvmrc` |
| **Claude 대화 기록** | ❌ | PC 로컬. 그래서 `PROGRESS.md`에 남기는 것이 중요 |
| **Claude 로컬 메모리** | ❌ | PC 로컬 (`~/.claude/`). 중요한 건 저장소에 기록할 것 |
| `node_modules`, `.expo`, `android/`, `ios/` | ❌ | gitignore. 각 PC에서 재생성 |

## 5. 자주 겪는 문제

**의존성 꼬임 / Metro 캐시 이상**
```bash
rm -rf node_modules && npm ci
npx expo start --clear
```

**Expo 패키지 버전이 SDK와 안 맞는다고 경고**
```bash
npx expo install --check   # 확인
npx expo install --fix     # 수정
```

**에뮬레이터를 못 찾음**
```bash
adb devices                              # 비어 있으면 AVD가 안 떠 있는 것
adb kill-server && adb start-server      # 그래도 안 되면
```

**`android/` `ios/` 폴더 관련 오류** (4주차 dev build 이후)
이 폴더들은 gitignore 대상입니다. 새 PC에서는 `npx expo prebuild --clean`으로 재생성합니다.
