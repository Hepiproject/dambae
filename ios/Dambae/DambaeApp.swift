import SwiftUI
import AVFoundation

@main
struct DambaeApp: App {
    init() {
        // 라이터·연기·풀벌레 소리가 이 앱의 본체다. 무음 스위치에서도 나야 한다.
        // (앱인토스 래퍼는 검수 요건 탓에 .ambient 상당으로 갈 수밖에 없었다)
        let session = AVAudioSession.sharedInstance()
        try? session.setCategory(.playback, mode: .default)
        try? session.setActive(true)
    }

    var body: some Scene {
        WindowGroup {
            SmokeWebView()
                .ignoresSafeArea()
                .persistentSystemOverlays(.hidden)
                .background(Color.pageBackground)
        }
    }
}

extension Color {
    /// index.html 의 html/body 배경(#05070d). 로드 전 흰 번쩍임을 막는다.
    static let pageBackground = Color(red: 5 / 255, green: 7 / 255, blue: 13 / 255)
}
