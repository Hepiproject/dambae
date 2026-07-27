// 앱인토스 번들용 dist 구성
//  1) 상위 레포의 build.js 를 실행해 cigarette.html → index.html 을 굽는다
//  2) 산출물과 정적 자산을 ait/dist 로 복사한다
// 실행:  npm run build   (ait 디렉터리에서)
import { execFileSync } from "node:child_process";
import { mkdirSync, copyFileSync, rmSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const aitRoot = join(here, "..");
const repoRoot = join(aitRoot, "..");
const dist = join(aitRoot, "dist");

// 1) 원본 빌드
execFileSync(process.execPath, ["build.js"], { cwd: repoRoot, stdio: "inherit" });

// 2) dist 재구성
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const assets = ["index.html", "og.png"];
for (const f of assets) {
  const src = join(repoRoot, f);
  if (!existsSync(src)) throw new Error(`빌드 산출물이 없다: ${f}`);
  copyFileSync(src, join(dist, f));
}

// 3) 번들 무결성 확인 — 외부 요청이 0이어야 한다(자기완결형 단일 페이지)
const html = readFileSync(join(dist, "index.html"), "utf8");
const external = [...html.matchAll(/(?:src|href)\s*=\s*["'](https?:)?\/\/[^"']+/gi)].map(m => m[0]);
if (external.length) {
  console.warn("외부 참조가 있다:", external);
}

console.log(`dist 생성 완료 → ${dist}`);
