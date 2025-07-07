'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Goal, CreateGoalRequest, UpdateGoalRequest } from '@/types';
import { useGoal } from '@/hooks/useGoal';
import { useRoutine } from '@/hooks/useRoutine';
import GoalMap from '@/features/goal/GoalMap';
import GoalCard from '@/features/goal/GoalCard';
import GoalEditor from '@/features/goal/GoalEditor';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import GoalList from '@/features/goal/GoalList';
import GoalSection from '@/features/goal/GoalSection';
import Link from 'next/link';
import MasterGoalCard from '@/features/goal/MasterGoalCard';
import { truncateText } from '@/utils';

// 샘플 데이터
const masterGoals = [
  {
    id: '1',
    title: '개발자 성장하기',
    description: '프론트엔드 개발 실력을 향상시키고 새로운 기술을 습득한다',
    progress: 65,
    color: 'purple',
    tags: ['개발', '성장', '프론트엔드'],
    subGoals: [
      {
        id: '2',
        title: 'React 마스터하기',
        description: 'React의 고급 기능들을 학습하고 실제 프로젝트에 적용한다',
        progress: 80,
        color: 'cyan',
        tags: ['React', 'JavaScript', '프론트엔드'],
      },
      {
        id: '3',
        title: 'TypeScript 학습',
        description: 'TypeScript의 타입 시스템을 깊이 있게 학습한다',
        progress: 45,
        color: 'pink',
        tags: ['TypeScript', '타입', '개발'],
      },
      {
        id: '4',
        title: '건강한 생활습관 만들기',
        description: '규칙적인 운동과 건강한 식습관을 형성한다',
        progress: 30,
        color: 'yellow',
        tags: ['건강', '운동', '생활습관'],
      },
    ],
  },
  {
    id: '5',
    title: 'AI 프로젝트 완성하기',
    description: 'AI 모델을 개발하고 실제 서비스에 배포한다',
    progress: 40,
    color: 'cyan',
    tags: ['AI', '딥러닝', '서비스'],
    subGoals: [
      {
        id: '6',
        title: '데이터 수집',
        description: 'AI 학습을 위한 데이터셋을 구축한다',
        progress: 60,
        color: 'purple',
        tags: ['데이터', '수집'],
      },
      {
        id: '7',
        title: '모델 학습',
        description: '딥러닝 모델을 설계하고 학습시킨다',
        progress: 30,
        color: 'pink',
        tags: ['딥러닝', '모델'],
      },
      {
        id: '8',
        title: '서비스 배포',
        description: '학습된 모델을 실제 서비스에 배포한다',
        progress: 10,
        color: 'yellow',
        tags: ['배포', '서비스'],
      },
    ],
  },
];

// 임시 데이터 (실제 프로젝트에서는 API/DB에서 가져옴)
const goals = [
  {
    "title": "개발자로 성장하기",
    "description": "프론트엔드부터 AI까지 전방위적으로 성장하며 포트폴리오 완성",
    "tags": ["개발", "프론트엔드", "AI", "커리어성장"],
    "progress": 45,
    "subGoals": [
      {
        "title": "React & Next.js 완전 마스터하기",
        "progress": 60,
        "tags": ["React", "Next", "UIUX"],
        "description": "컴포넌트 설계, Tailwind, SSR/CSR, 접근성 등 심화"
      },
      {
        "title": "TypeScript 심화",
        "progress": 30,
        "tags": ["TypeScript", "안정성"],
        "description": "타입 선언, 제네릭, 타입 유틸리티, 실전 프로젝트 적용"
      },
      {
        "title": "AI 서비스 연동 및 실험",
        "progress": 10,
        "tags": ["AI", "OpenAI", "실험"],
        "description": "GPT, Vision API, Emotion API 등을 통한 인터랙티브 서비스 실험"
      },
      {
        "title": "개인 포트폴리오 웹사이트 리뉴얼",
        "progress": 80,
        "tags": ["포트폴리오", "디자인", "자기표현"],
        "description": "모바일/웹 반응형, 애니메이션, 글래스모피즘 스타일 통합"
      }
    ]
  },
  {
    "title": "멀티모달 감정 회고 서비스 완성하기",
    "description": "멀티모달 감정 인식 기술을 적용한 개인 성장 피드백 서비스 개발",
    "tags": ["AI", "감정인식", "회고", "프로젝트"],
    "progress": 25,
    "subGoals": [
      {
        "title": "표정 기반 감정 분석 모듈 구현",
        "progress": 40,
        "tags": ["Vision", "ML"],
        "description": "Mediapipe, MTCNN, FACS 기반 표정 감정 모델 적용"
      },
      {
        "title": "음성 기반 감정 분석",
        "progress": 10,
        "tags": ["Voice", "Signal"],
        "description": "음성 톤/스펙트럼 기반 실험"
      },
      {
        "title": "텍스트 기반 심리 해석",
        "progress": 20,
        "tags": ["NLP", "심리학"],
        "description": "VAD 모델, BERT 기반 감정 분석"
      },
      {
        "title": "PDF 개인 리포트 자동화",
        "progress": 30,
        "tags": ["리포트", "자동화"],
        "description": "세션 기록, PDF/HTML 리포트 자동 생성"
      }
    ]
  },
  {
    "title": "개인 루틴 & 콘텐츠 제작 루틴 확립",
    "description": "일상과 창작을 동시에 최적화하는 루틴 설계 및 실험",
    "tags": ["루틴", "콘텐츠", "생산성"],
    "progress": 55,
    "subGoals": [
      {
        "title": "아침 기상 루틴 확립",
        "progress": 70,
        "tags": ["건강", "습관"],
        "description": "기상, 스트레칭, 저널 작성, 가벼운 운동 포함"
      },
      {
        "title": "주간 유튜브 쇼츠/리일스 제작 루틴",
        "progress": 50,
        "tags": ["영상", "SNS"],
        "description": "촬영 → 컷 편집 → 자막 → 썸네일 → 업로드 플로우 정립"
      },
      {
        "title": "주간 회고 & 다음 주 계획",
        "progress": 60,
        "tags": ["회고", "계획"],
        "description": "Notion 기반 주간 리뷰 및 목표 재설계"
      },
      {
        "title": "스터디윗미/라이브 제작 루틴",
        "progress": 40,
        "tags": ["라이브", "소통"],
        "description": "실시간 작업 방송, 시청자 참여형 콘텐츠 기획"
      }
    ]
  },
  {
    "title": "영어 실력 한 단계 올리기",
    "description": "실제 업무 및 글로벌 협업에 필요한 영어 능력 강화",
    "tags": ["영어", "커뮤니케이션", "글로벌"],
    "progress": 35,
    "subGoals": [
      {
        "title": "비즈니스 이메일 작성 훈련",
        "progress": 60,
        "tags": ["Writing"],
        "description": "클라이언트, 파트너, 내부 커뮤니케이션용"
      },
      {
        "title": "실전 회화 스터디 참여",
        "progress": 20,
        "tags": ["Speaking"],
        "description": "주 2회 네이티브 그룹 참여"
      },
      {
        "title": "기술/AI 관련 영어 문서 독해",
        "progress": 30,
        "tags": ["Reading"],
        "description": "논문, White paper, 개발 문서 독해"
      },
      {
        "title": "발표 및 피치덱 발표 연습",
        "progress": 10,
        "tags": ["Presentation"],
        "description": "IR 피치덱, 기술 발표, Q&A 대응 훈련"
      }
    ]
  },
  {
    "title": "나만의 디자인 시스템 구축",
    "description": "개인 브랜드 아이덴티티와 UX 통일성을 위한 디자인 시스템 설계",
    "tags": ["디자인", "시스템", "브랜딩"],
    "progress": 20,
    "subGoals": [
      {
        "title": "색상 팔레트 및 컴포넌트 가이드",
        "progress": 30,
        "tags": ["컬러", "UI"],
        "description": "주 컬러(#F76241 등) 및 서브 컬러 체계화"
      },
      {
        "title": "타이포그래피 및 스케일 설계",
        "progress": 15,
        "tags": ["폰트", "가이드"],
        "description": "반응형 환경 고려한 계층화 설계"
      },
      {
        "title": "디자인 토큰 및 변수화",
        "progress": 10,
        "tags": ["Token", "시스템화"],
        "description": "Tailwind, CSS 변수 기반"
      },
      {
        "title": "Figma 라이브러리 정리",
        "progress": 25,
        "tags": ["Figma"],
        "description": "컴포넌트/아이콘/모듈화 정리 및 공유"
      }
    ]
  }
];

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // 카드 위치 추적용
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardCenters, setCardCenters] = useState<{x: number, y: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // 카드 위치 측정 함수
  const updateCardCenters = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centers = cardRefs.current.map(card => {
      if (!card) return { x: 0, y: 0 };
      const cardRect = card.getBoundingClientRect();
      return {
        x: cardRect.left - rect.left + cardRect.width / 2,
        y: cardRect.top - rect.top + cardRect.height / 2,
      };
    });
    setCardCenters(centers);
  };

  useLayoutEffect(() => {
    updateCardCenters();
    window.addEventListener('resize', updateCardCenters);
    return () => {
      window.removeEventListener('resize', updateCardCenters);
    };
  }, [goals.length]);

  // 실제 API 연동 시에는 이 훅들을 사용
  // const { goals, loading, error, createGoal, updateGoal, deleteGoal, completeGoal } = useGoal();
  // const { routines, getTodayRoutines, getCompletedToday } = useRoutine();

  // 샘플 데이터 사용
  const loading = false;
  const error = null;

  const handleCreateGoal = async (goalData: CreateGoalRequest | UpdateGoalRequest) => {
    // CreateGoalRequest만 처리
    if (!('title' in goalData) || typeof goalData.title !== 'string') return;
    console.log('새 목표 생성:', goalData);
    setIsEditorOpen(false);
    // 실제로는 createGoal(goalData) 호출
  };

  const handleUpdateGoal = async (goalData: CreateGoalRequest | UpdateGoalRequest) => {
    // UpdateGoalRequest만 처리
    if (!('id' in goalData)) return;
    console.log('목표 수정:', goalData);
    setIsEditorOpen(false);
    setEditingGoal(null);
    // 실제로는 updateGoal(editingGoal!.id, goalData) 호출
  };

  const handleDeleteGoal = async (goalId: string) => {
    console.log('목표 삭제:', goalId);
    // 실제로는 deleteGoal(goalId) 호출
  };

  const handleCompleteGoal = async (goalId: string) => {
    console.log('목표 완료:', goalId);
    // 실제로는 completeGoal(goalId) 호출
  };

  const openEditor = (goal?: Goal) => {
    setEditingGoal(goal || null);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingGoal(null);
  };

  const todayRoutines: any[] = []; // getTodayRoutines();
  const completedToday = []; // getCompletedToday();

  return (
    <div className="min-h-screen flex flex-col bg-deep-navy text-glass-white">
      <header className="w-full flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">Branchify</h1>
        <button className="border border-neon-cyan text-neon-cyan rounded-full px-6 py-2 hover:bg-neon-cyan/10 transition">새 목표</button>
      </header>
      <main ref={containerRef} className="relative flex-1 flex flex-wrap items-center justify-center gap-8 px-8 overflow-hidden">
        {/* 뉴런 연결 SVG 오버레이 */}
        <svg
          className="pointer-events-none absolute left-0 top-0 w-full h-full z-10"
          width="100%"
          height="100%"
          viewBox={`0 0 ${containerRef.current?.offsetWidth || 1920} ${containerRef.current?.offsetHeight || 1080}`}
          style={{maxWidth: '100vw', maxHeight: '100vh'}}
        >
          <defs>
            {/* 뉴런 글로우 효과 */}
            <filter id="neuron-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00fff7" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#00fff7" floodOpacity="0.4" />
              <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#00fff7" floodOpacity="0.2" />
            </filter>
            
            {/* 시냅스 연결 글로우 */}
            <filter id="synapse-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff00ff" floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ff00ff" floodOpacity="0.3" />
            </filter>
            
            {/* 전기 신호 애니메이션 */}
            <linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00fff7" stopOpacity="0">
                <animate attributeName="stopOpacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="1">
                <animate attributeName="stopOpacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00fff7" stopOpacity="0">
                <animate attributeName="stopOpacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* 뉴런 연결선 */}
          {cardCenters.length > 1 && cardCenters.map((center, idx) => {
            if (idx === cardCenters.length - 1) return null;
            const next = cardCenters[idx + 1];
            
            // 연결선 중간점 계산
            const midX = (center.x + next.x) / 2;
            const midY = (center.y + next.y) / 2;
            
            // 곡선 경로 생성 (뉴런 연결처럼)
            const dx = next.x - center.x;
            const dy = next.y - center.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const controlOffset = distance * 0.3;
            
            return (
              <g key={idx}>
                {/* 메인 연결선 */}
                <path
                  d={`M ${center.x} ${center.y} Q ${midX + controlOffset} ${midY - controlOffset} ${next.x} ${next.y}`}
                  stroke="url(#signal-gradient)"
                  strokeWidth="5"
                  fill="none"
                  filter="url(#synapse-glow)"
                  strokeLinecap="round"
                  opacity="1"
                />
                
                {/* 시냅스 점들 */}
                <circle
                  cx={midX}
                  cy={midY}
                  r="3"
                  fill="#ff00ff"
                  filter="url(#synapse-glow)"
                >
                  <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
                </circle>
                
                {/* 전기 신호 파동 */}
                <circle
                  cx={midX}
                  cy={midY}
                  r="8"
                  fill="none"
                  stroke="#00fff7"
                  strokeWidth="1"
                  opacity="0.3"
                >
                  <animate attributeName="r" values="8;20;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          })}
        </svg>
        
        {goals.map((goal, idx) => (
          <Link key={idx} href={`/goal/${idx}`}>
            <div
              ref={el => { cardRefs.current[idx] = el; }}
              className="relative z-20 group pointer-events-auto"
            >
              {/* 뉴런 노드 */}
              <div className="relative">
                {/* 뉴런 본체 */}
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-glass/80 to-glass/40 border-2 border-neon-cyan/50 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center p-6 hover:scale-105 transition-all duration-300 group-hover:border-neon-cyan">
                  {/* 뉴런 돌출부 (axon) */}
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-2 bg-gradient-to-r from-neon-cyan to-transparent rounded-full opacity-60"></div>
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-2 bg-gradient-to-l from-neon-cyan to-transparent rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-neon-cyan to-transparent rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 w-2 h-8 bg-gradient-to-t from-neon-cyan to-transparent rounded-full opacity-60"></div>
                  {/* 기본 정보 */}
                  <div className="text-center max-w-[220px] mx-auto overflow-hidden">
                    <h2 className="text-xl font-extrabold mb-2 text-white group-hover:text-neon-cyan transition-colors truncate max-w-full drop-shadow-xl" title={goal.title} aria-label={`목표 제목: ${goal.title}`}>
                      {truncateText(goal.title, 12)}
                    </h2>
                    {/* 대표 태그만 */}
                    <div className="flex gap-2 mb-4 flex-wrap justify-center">
                      {goal.tags.slice(0, 1).map(tag => (
                        <span key={tag} className="text-sm border border-neon-cyan/50 rounded-full px-2 py-1 text-neon-cyan bg-white/5 backdrop-blur-sm" aria-label={`태그: ${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* 진행률 */}
                    <div className="w-full max-w-48 mx-auto mb-4">
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-500"
                          style={{width: `${goal.progress}%`}}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-neon-cyan text-base font-bold" aria-label={`진행률: ${goal.progress}%`}>{goal.progress}%</span>
                      </div>
                    </div>
                  </div>
                  {/* 상세 정보 오버레이: hover 시만 노출 */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 bg-opacity-90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-6 pointer-events-none">
                    <div className="text-center max-w-[220px] mx-auto">
                      <h2 className="text-lg font-bold mb-2 text-neon-cyan truncate max-w-full drop-shadow-lg" title={goal.title}>
                        {truncateText(goal.title, 12)}
                      </h2>
                      <p className="text-xs text-white/80 mb-3 line-clamp-2 max-h-[2.6em] overflow-hidden">
                        {goal.description}
                      </p>
                      {/* 전체 태그 */}
                      <div className="flex gap-2 mb-4 flex-wrap justify-center">
                        {goal.tags.map(tag => (
                          <span key={tag} className="text-sm border border-neon-cyan/50 rounded-full px-2 py-1 text-neon-cyan bg-white/5 backdrop-blur-sm" aria-label={`태그: ${tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* 하위 목표 수 */}
                      <div className="text-xs text-white/60">
                        {goal.subGoals.length}개 하위 목표
                      </div>
                    </div>
                  </div>
                </div>
                {/* 뉴런 글로우 효과 */}
                <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* 전기 신호 애니메이션 */}
                <div className="absolute inset-0 rounded-full border border-neon-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-full border border-neon-cyan/20 animate-ping"></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}