# 🌟 Branchify

> 목표를 네온처럼 빛나고 분기하며, 몰입과 성장의 에너지를 한눈에 체험하도록 설계된 차세대 목표 관리 플랫폼

## 📄 프로젝트 개요

Branchify는 목표를 단순히 기록하는 것이 아니라, 분기(Branch) 개념을 시각적으로 표현하여 사용자가 목표를 세분화하고 몰입감 있게 관리할 수 있도록 설계된 네온 기반 목표 관리 서비스입니다.

이 서비스는 네온 에너지 흐름과 Liquid Glass UI를 결합해 미래적이고 힙한 몰입형 목표 관리 경험을 제공합니다.

## ✨ 주요 기능

- **🎯 네온 목표 맵**: 목표를 시각적으로 분기하여 관리
- **💫 Liquid Glass UI**: 미래적인 글래스모피즘 디자인
- **⚡ 에너지 라인**: 목표 간의 연결을 네온 라인으로 표현
- **🎨 다채로운 색상**: 네온 퍼플, 사이안, 핑크, 옐로우
- **📊 실시간 진행률**: 목표 달성 현황을 직관적으로 표시
- **🔄 루틴 관리**: 일상적인 습관 형성 지원
- **🤖 AI 피드백**: 목표 달성을 위한 개인화된 조언

## 🛠️ 기술 스택

- **Frontend**: Next.js 15 (App Router), TypeScript
- **Styling**: TailwindCSS 4
- **Animation**: Framer Motion
- **HTTP Client**: Axios
- **Package Manager**: pnpm

## 🚀 시작하기

### 필수 요구사항

- Node.js 18+ 
- pnpm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```

## 📁 프로젝트 구조

```
branchify/
├── public/                 # 정적 파일
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # 루트 레이아웃
│   │   ├── page.tsx       # 메인 페이지
│   │   └── globals.css    # 글로벌 스타일
│   ├── components/        # 공통 컴포넌트
│   │   ├── GlassCard.tsx  # 글래스 카드 컴포넌트
│   │   └── NeonButton.tsx # 네온 버튼 컴포넌트
│   ├── features/          # 기능별 컴포넌트
│   │   └── goal/          # 목표 관련 기능
│   │       ├── GoalMap.tsx    # 목표 맵
│   │       ├── GoalCard.tsx   # 목표 카드
│   │       └── GoalEditor.tsx # 목표 편집기
│   ├── hooks/             # 커스텀 훅
│   │   ├── useGoal.ts     # 목표 관리 훅
│   │   └── useRoutine.ts  # 루틴 관리 훅
│   ├── lib/               # 라이브러리 설정
│   │   └── api.ts         # API 클라이언트
│   ├── types/             # TypeScript 타입 정의
│   ├── utils/             # 유틸리티 함수
│   └── constants/         # 상수 정의
```

## 🎨 디자인 시스템

### 색상 팔레트

- **Neon Purple**: `#A259FF` - 주요 브랜드 컬러
- **Neon Cyan**: `#00E0FF` - 성공/완료 상태
- **Neon Pink**: `#FF2E63` - 경고/중요 상태
- **Deep Navy**: `#0D0D2B` - 배경색
- **Glass White**: `#F0F0F5` - 텍스트 색상
- **Electric Yellow**: `#FFEA00` - 강조 색상

### 타이포그래피

- **Headline**: Poppins (Bold/Semi-Bold)
- **Body**: Inter (Regular/Medium)

### UI 스타일

- **Liquid Glass**: 투명 + blur + Glow border
- **Neon Glow**: 버튼 및 카드 글로우 효과
- **Energy Lines**: Bezier curve 기반 연결선
- **반투명 카드**: 글래스모피즘 효과

## 🔧 개발 가이드

### 컴포넌트 작성 규칙

1. **Atomic Design** 패턴 기반
2. **TypeScript** 엄격 모드 사용
3. **TailwindCSS** 우선 사용
4. **Framer Motion** 애니메이션 적용

### 코드 스타일

```typescript
// 컴포넌트 예시
interface ComponentProps {
  title: string;
  onClick?: () => void;
}

const Component: React.FC<ComponentProps> = ({ title, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass neon-glow"
    >
      {title}
    </motion.div>
  );
};
```

### API 연동

```typescript
// API 클라이언트 사용 예시
import apiClient from '@/lib/api';

const createGoal = async (goalData: CreateGoalRequest) => {
  try {
    const newGoal = await apiClient.createGoal(goalData);
    return newGoal;
  } catch (error) {
    console.error('목표 생성 실패:', error);
    throw error;
  }
};
```

## 📱 주요 화면

### 메인 대시보드
- 네온 목표 맵 시각화
- 빠른 통계 카드
- 오늘의 루틴 목록
- AI 피드백 알림

### 목표 관리
- 목표 생성/수정/삭제
- 진행률 추적
- 하위 목표 분기
- 태그 시스템

### 루틴 관리
- 일일/주간/월간 루틴
- 연속 달성 기록
- 완료 상태 관리

## 🎯 로드맵

### Phase 1 (현재)
- ✅ 기본 UI/UX 구현
- ✅ 목표 관리 기능
- ✅ 네온 맵 시각화
- ✅ 반응형 디자인

### Phase 2 (예정)
- 🔄 사용자 인증 시스템
- 🔄 백엔드 API 연동
- 🔄 실시간 동기화
- 🔄 알림 시스템

### Phase 3 (예정)
- 📋 모바일 앱 개발
- 📋 소셜 기능 추가
- 📋 고급 분석 도구
- 📋 AI 기반 추천 시스템

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

**Branchify** - 네온처럼 빛나는 목표 관리의 새로운 경험 ✨
