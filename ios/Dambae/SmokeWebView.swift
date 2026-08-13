import SwiftUI
import UIKit
import WebKit

/// 레포 루트의 index.html 을 번들에서 그대로 띄우는 전체화면 웹뷰.
/// 페이지가 외부 요청 0 의 자기완결형이라 네트워크 없이 동작한다.
struct SmokeWebView: UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        // 기본값(제스처 요구)이 WKWebView 에서 Web Audio 를 게이팅한다. 앱인토스 무음의 원인이었다.
        config.mediaTypesRequiringUserActionForPlayback = []
        config.userContentController.addUserScript(
            WKUserScript(
                source: """
                    var s = document.documentElement.style;
                    s.webkitTouchCallout = 'none';
                    s.webkitUserSelect = 'none';
                    """,
                injectionTime: .atDocumentEnd,
                forMainFrameOnly: true))

        let background = UIColor(red: 5 / 255, green: 7 / 255, blue: 13 / 255, alpha: 1)
        // frame .zero 로 만들면 첫 레이아웃의 뷰포트 높이가 0 이다.
        // HUD 는 position:fixed + bottom:clamp(...,4vh,...) 이라 좌상단에 한 번 그려지고
        // 그 합성 레이어가 갱신되지 않아 잔상으로 남는다. 처음부터 화면 크기를 준다.
        let webView = WKWebView(frame: UIScreen.main.bounds, configuration: config)
        webView.isOpaque = false
        webView.backgroundColor = background
        webView.scrollView.backgroundColor = background
        // 캔버스 한 장이 화면 전체다. 스크롤·바운스·핀치는 조작(긁기·꾹누르기)만 방해한다.
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.scrollView.pinchGestureRecognizer?.isEnabled = false

        // 한 대 태우는 동안 화면이 꺼지면 안 된다.
        UIApplication.shared.isIdleTimerDisabled = true

        load(into: webView)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    /// 평소엔 빌드 산출물 index.html 을 띄운다.
    /// 스토어 스크린샷을 찍을 때만 촬영용 scene.html 의 ?warm 프리렌더 훅을 쓴다.
    ///   xcrun simctl launch --setenv DAMBAE_SCENE "warm=6&weather=rain&puff=2" <sim> com.brandnewlegacy.dambae
    private func load(into webView: WKWebView) {
        #if DEBUG
            if let scene = ProcessInfo.processInfo.environment["DAMBAE_SCENE"],
                let source = Bundle.main.url(forResource: "scene", withExtension: "html"),
                let url = URL(string: "\(source.absoluteString)?\(scene)")
            {
                // loadFileURL 은 쿼리를 버린다. loadFileRequest 는 유지한다.
                webView.loadFileRequest(
                    URLRequest(url: url),
                    allowingReadAccessTo: source.deletingLastPathComponent())
                return
            }
        #endif
        guard let url = Bundle.main.url(forResource: "index", withExtension: "html") else { return }
        webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }
}
