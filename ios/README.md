# iOS 래퍼 (담배 한 대)

레포 루트의 `index.html` 을 그대로 번들에 담아 띄우는 전체화면 WKWebView 앱이다.
페이지가 외부 요청 0 의 자기완결형이라 네트워크 없이 동작한다.

## 빌드
```bash
cd ios
xcodegen generate      # Dambae.xcodeproj 생성(커밋하지 않음)
open Dambae.xcodeproj
```

## 구성
- `project.yml` — XcodeGen 정의. 웹 정본은 `../index.html` 을 직접 리소스로 참조한다(사본 없음).
- `Dambae/DambaeApp.swift` — 진입점. `AVAudioSession.playback` 으로 무음 스위치에서도 소리를 낸다.
- `Dambae/SmokeWebView.swift` — 웹뷰. 스크롤·바운스·핀치 차단, 화면 꺼짐 방지.

## 함정
- `WKWebView` 를 `frame: .zero` 로 만들면 첫 레이아웃 뷰포트 높이가 0 이다.
  HUD 가 `position:fixed` + `vh` 기반이라 위치가 무너진다. 화면 크기를 명시해서 만든다.
- `mediaTypesRequiringUserActionForPlayback` 을 비우지 않으면 Web Audio 가 게이팅된다.
  앱인토스 래퍼에서 실기기 무음으로 확인된 사안이다.
- `index.html` 은 빌드 산출물이다. 수정은 `cigarette.html` → `node build.js` 순서로 한다.

## 배포
- Bundle ID: `com.brandnewlegacy.dambae`
- Team: `CTV7Z5BXL8`

## 스토어 스크린샷
```bash
node ios/Screenshots/build-scene.js     # cigarette.html + charset 헤드 → scene.html (gitignore)
xcodegen generate && xcodebuild ... -configuration Debug build
SIMCTL_CHILD_DAMBAE_SCENE="warm=5&weather=night&type=esse&puff=2.5" \
  xcrun simctl launch <sim> com.brandnewlegacy.dambae
xcrun simctl io <sim> screenshot out.png
```
- iPhone 17 Pro Max 시뮬레이터가 6.9"(1320×2868) 규격을 그대로 뱉는다.
- 론치 직후 캡처하면 빈 화면이 찍힌다. 6초 정도 기다린다.
- `cigarette.html` 을 직접 번들하면 `<meta charset>` 이 없어 한글이 깨진다. 반드시 build-scene.js 를 거친다.
- `scene.html` 은 DEBUG 에서만 로드되나 리소스 자체는 Release 에도 포함된다(동작 영향 없음).
