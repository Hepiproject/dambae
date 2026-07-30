import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'dambae',
  brand: {
    displayName: '담배 한 대',
    primaryColor: '#1B64DA',
    // 콘솔에 등록한 앱 로고와 동일해야 한다. 다르면 검수에서 자동 반려된다.
    icon: 'https://static.toss.im/appsintoss/63235/b936c9d4-0ac2-44e7-9300-5a76ce5f0ee6.png',
  },
  // 기본값 mediaPlaybackRequiresUserAction: true 가 WKWebView 에서 오디오를 게이팅한다.
  // 실기기(아이폰·벨소리 모드)에서 Web Audio 가 전혀 안 들려 끈다.
  webViewProps: {
    mediaPlaybackRequiresUserAction: false,
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'npm run dev',
      build: 'npm run build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
