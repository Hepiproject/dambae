# HANDOFF — 담배 한 대 (dambae)

**최종 갱신:** 2026-07-21 · **상태:** 완료 (실배포 + 깃연동 끝, 남은 건 선택 확장)

> 비흡연자를 위한 온라인 흡연 사이트. 전부 캔버스·Web Audio로 합성된 자기완결형 단일 페이지(외부 요청 0).

## 지금 어디까지 됐나
- [x] **실배포 완료** — https://dambae.vercel.app (Vercel 프로덕션, 200 확인)
- [x] **깃 레포 생성·푸시** — https://github.com/Hepiproject/dambae (master)
- [x] **Vercel ↔ GitHub 연동** — `vercel git connect` 완료. **git push → 자동배포 실증됨**(push가 새 프로덕션 배포 트리거, Ready)
- [x] **프로덕션 빌드** — `build.js`로 죽은코드(안 쓰는 배경 사진 base64 31KB·bgImg)·디버그 훅(`?warm` 프리렌더) 제거 + 완전한 HTML 문서 래핑(메타·OG·🚬 파비콘). 89KB→56KB. JS `node --check` 그린
- [x] **모바일 오디오 unlock 보강** — resume+무음버퍼 킥·문서 전역 제스처 리스너·매프레임 suspended 복구·iOS 무음스위치 우회(무음 WAV `<audio>`). **사용자 실기기에서 "소리 난다" 확인**
- [x] **공유 문구** — OG/description = "비흡연자를 위한 온라인 흡연 사이트" (라이브 반영 확인)
- [x] OG 썸네일 `og.png`(1200×630, 밤 장면)

## 다음 세션이 할 일 (전부 선택 — 막힌 것 없음)
1. **커스텀 도메인** — Vercel Domains에서 `dambae.vercel.app` → 원하는 주소 연결(5분)
2. **PWA**(manifest+SW, 홈화면 추가) / **Vercel Analytics** 추가
3. 앰비언스 소리 밸런스·긁기 민감도(현재 85px) 등 실기기 튜닝

## 재개 지점
- `repos/dambae/README.md` (조작·구조·빌드법) → `cigarette.html`(개발 소스, 디버그 훅 포함) 에서 작업
- 수정 워크플로우: `cigarette.html` 편집 → `node build.js`(→`index.html`) → `git add -A && git commit && git push` → **Vercel 자동배포**
- 헤드리스 검증법: `?warm=6&weather=night&type=marlboro` 등 쿼리로 씬 프리렌더(개발 소스에만 존재, 빌드시 제거됨)

## 결정된 것 (뒤집지 마라)
- **정본 = `C:\Users\hase0\claude_code\repos\dambae`** (깃 레포). ⚠️ 세션 임시폴더(scratchpad)의 `cigarette.html`은 **낡은 사본** — 세션 끝나면 사라진다. 반드시 레포에서 작업.
- **스택 = 순수 HTML/Canvas/Web Audio 단일 파일**(빌드 의존성 없음). 프레임워크 도입 불필요.
- **배포 = Vercel 정적 + GitHub 자동배포**. `index.html`은 `build.js` 산출물이므로 **직접 편집 금지**(소스는 `cigarette.html`).
- 인터랙션: **아래로 긁어 점화** → 꾹 빨기/떼면 연기 → 우클릭·더블탭 재털기 → 다 피면 꽁초 재떨이로. 날씨 4종(밤/낮=여름/비/눈)+날씨별 배경음.
- 공유 문구는 **"비흡연자를 위한 온라인 흡연 사이트"** 로 확정.

## 함정·미결
- 🟡 **HANDOFF.md·`.env.local`·`.vercel`은 공개 레포에 커밋하지 마라.** `.env.local`·`.vercel`은 gitignore됨(확인). 이 HANDOFF.md는 현재 **untracked**로 두었다(로컬 전용 — 공개 레포에 로컬경로 노출 방지). 커밋하려면 먼저 `.gitignore`에 넣어라.
- 🟡 **`og.png` 재생성은 수동**: 헤드리스 크롬으로 `cigarette.html?warm=6&weather=night` 을 1200×630 스크린샷. `build.js`는 og.png를 안 만든다(복사만).
- 🟡 iOS 무음스위치 우회를 넣었지만 모든 기기 검증은 아님. 특정 기기서 무음이면 무음 WAV 접근 재점검.
- 🟢 gh 토큰: 처음 fine-grained PAT는 레포 생성 권한 없었음 → `gh auth login` 웹플로우로 **classic 토큰(repo scope)** 재발급해 해결.
- ⚠️ **흡연 소재** — 웹 단순 배포는 OK. 수익화/앱화 시 플랫폼(앱스토어·광고) 정책 확인 필요.

## 세션 로그
- **2026-07-21** — 아티팩트로 완성돼 있던 앱을 실배포. 프로덕션 빌드(죽은코드·디버그 제거)·모바일 오디오 fix·공유문구 변경·Vercel 배포·GitHub 레포 생성·Vercel 자동배포 연동까지 완주. 라이브·자동배포 실증.
