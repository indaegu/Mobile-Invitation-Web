export default function InvitationPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-pink-50 to-purple-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* 아이콘 영역 */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* 메인 텍스트 */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            정상 업로드 확인
          </h1>
          <p className="text-gray-600 mb-6">
            페이지가 성공적으로 로드되었습니다
          </p>

          {/* 상태 표시 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">React</span>
              <span className="text-sm font-semibold text-green-600">✓ 정상</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Tailwind CSS</span>
              <span className="text-sm font-semibold text-green-600">✓ 정상</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">TypeScript</span>
              <span className="text-sm font-semibold text-green-600">✓ 정상</span>
            </div>
          </div>

          {/* 하단 메시지 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              모바일 초대장 웹사이트가 준비되었습니다!!
            </p>
          </div>
        </div>
      </div>
    );
  }
  