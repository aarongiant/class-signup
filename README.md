# 거인영어 수강신청 시스템

## 📁 파일 구성

| 파일 | 용도 |
|------|------|
| `index.html` | 수강생용 페이지 (달력에서 시간 클릭하여 신청) |
| `admin.html` | 관리자(선생님) 페이지 (비밀번호: `091984`) |
| `style.css` | 공통 디자인 |
| `firebase-config.js` | Firebase 연결 설정 |
| `utils.js` | 공통 유틸리티 (색상 생성 등) |

## 🚀 GitHub Pages 배포 방법

1. GitHub에서 새 저장소(repository) 생성
   - 이름: `class-signup` (자유롭게)
   - **Public** 선택 (Private은 GitHub Pages 무료 불가)

2. 이 5개 파일을 모두 업로드
   - 저장소 화면 → "Add file" → "Upload files" → 드래그앤드롭

3. 저장소 설정 → Pages 메뉴
   - Source: `main` 브랜치, `/ (root)` 선택
   - Save

4. 잠시 후 `https://(사용자명).github.io/class-signup/` 주소로 접속 가능

## 🌐 접속 주소

- **수강생용**: `https://(사용자명).github.io/class-signup/`
- **관리자용**: `https://(사용자명).github.io/class-signup/admin.html`

네이버 블로그에 수강생용 링크를 공유하시면 됩니다.

## 🎯 주요 기능

### 수강생용
- 월별 달력 보기
- 시간 클릭 → 이름 입력 → 신청 확정 (취소 불가)
- 1명 신청 시 마감 표시
- 신청자별 고유 색상 자동 표시
- 정정 모드 시 본인 신청 취소/변경

### 관리자용 (5개 탭)
1. **수업 시간 관리**: 월별 시간 입력, 휴일 지정, 패턴 일괄 입력
2. **신청 오픈 시간**: 특정 일시에만 신청 가능하도록 설정
3. **정정 모드**: ON/OFF 스위치
4. **신청 현황**: 수강생별 신청 내역, 강제 삭제 가능
5. **캘린더 내보내기**: ICS 파일로 다운로드 → 구글 캘린더 가져오기

## 📝 Firebase 보안 규칙 (설정 필요)

Firebase Console → Firestore Database → 규칙 탭에 다음 코드 붙여넣기:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 누구나 읽고 쓸 수 있음 (관리자 비밀번호로 admin.html 보호)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> 💡 이 시스템은 관리자 페이지가 비밀번호로 보호되며, 수강생은 모든 작업에서 본인 이름을 입력해야 합니다.
> 더 강한 보안이 필요하면 Firebase Authentication 도입을 고려하세요.

## 🔒 관리자 비밀번호 변경

`admin.html` 파일에서 다음 줄을 찾아 수정:

```javascript
const ADMIN_PASSWORD = '091984';
```

## 🔄 코드 업데이트 시 캐시 처리

코드를 수정해서 다시 배포할 때 사용자 브라우저에 옛 버전이 캐시되어 있을 수 있습니다.
업데이트가 사용자에게 즉시 반영되도록 하려면 **버전 번호**를 올려주세요.

### `index.html`과 `admin.html` 두 파일에서:

```html
<!-- 이런 부분들을 찾아서 -->
<link rel="stylesheet" href="style.css?v=20260516a">
import { db } from './firebase-config.js?v=20260516a';
import { ... } from './utils.js?v=20260516a';
```

`v=20260516a` 부분을 새 날짜로 변경 (예: `v=20260520b`)

이렇게 하면 브라우저가 새 코드를 무조건 받아옵니다. 메타 태그로도 캐시 무력화가 적용되어 있어 대부분 자동으로 새 버전이 적용됩니다.

## ⚠️ 주의사항

- 한번 신청한 수업은 일반 모드에서 수강생이 취소할 수 없습니다 (관리자는 삭제 가능)
- 정정 모드에서는 본인 이름을 정확히 입력해야 본인 신청을 취소할 수 있습니다
- 한국시간(KST) 기준으로 동작합니다
