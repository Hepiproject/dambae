// 개발 소스(cigarette.html) → 배포용 index.html 빌드
//  - 죽은 코드(안 쓰는 배경 사진 base64·bgImg) 제거
//  - 디버그 프리렌더 훅(?warm ...) 제거
//  - 완전한 HTML 문서로 래핑(메타·OG·파비콘)
// 실행:  node build.js   (그 뒤 og.png 는 별도 생성/유지)
const fs = require("fs");
let s = fs.readFileSync("cigarette.html", "utf8");
s = s.replace(/\r\n/g, "\n");   // core.autocrlf=true 환경 대응. 아래 치환 정규식이 LF 전제임

s = s.replace(/\n\s*\/\/ 실사 밤하늘 배경[^\n]*\n\s*const BG = "[^"]*";\n\s*const bgImg = new Image\(\)[^\n]*\n/, "\n");
s = s.replace(/\n\s*\/\/ 프리렌더 워밍업[\s\S]*?\} else \{\n\s*requestAnimationFrame\(frame\);\n\s*\}\n/, "\n  requestAnimationFrame(frame);\n");
s = s.replace(/^<title>[^<]*<\/title>\s*/, "");

for (const bad of ['const BG =', 'bgImg', 'q.has("warm")', 'URLSearchParams']) {
  if (s.includes(bad)) { console.error("STILL PRESENT:", bad); process.exit(1); }
}

const head = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#0a0f18">
<title>담배 한 대</title>
<meta name="description" content="비흡연자를 위한 온라인 흡연 사이트">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Ctext%20y='.9em'%20font-size='90'%3E%F0%9F%9A%AC%3C/text%3E%3C/svg%3E">
<meta property="og:type" content="website">
<meta property="og:title" content="담배 한 대">
<meta property="og:description" content="비흡연자를 위한 온라인 흡연 사이트">
<meta property="og:image" content="https://dambae.vercel.app/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<style>html,body{background:#0a0f18;}</style>
</head>
<body>
`;
fs.writeFileSync("index.html", head + s.trimStart() + "\n</body>\n</html>\n");
console.log("built index.html");
