// 스토어 스크린샷 촬영용 HTML 생성.
// build.js 와 달리 ?warm 프리렌더 훅을 남긴다. charset 등 head 는 동일하게 씌운다.
// 실행: node ios/Screenshots/build-scene.js
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..", "..");
let s = fs.readFileSync(path.join(root, "cigarette.html"), "utf8").replace(/\r\n/g, "\n");
s = s.replace(/^<title>[^<]*<\/title>\s*/, "");
const head = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#0a0f18">
<title>담배 한 대</title>
<style>html,body{background:#0a0f18;}</style>
</head>
<body>
`;
fs.writeFileSync(path.join(__dirname, "scene.html"), head + s.trimStart() + "\n</body>\n</html>\n");
console.log("built ios/Screenshots/scene.html");
