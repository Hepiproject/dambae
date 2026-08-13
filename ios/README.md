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
