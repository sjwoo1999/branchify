"use client";
import React, { useRef, useState, use as usePromise } from 'react';
import Link from 'next/link';
import { forceSimulation, forceManyBody, forceCenter, forceCollide, forceLink, forceX, forceY } from 'd3-force';

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

interface PageProps {
  params: { id: string };
}

// 랜덤 함수 (seeded)
function seededRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default function GoalDetailPage({ params }: PageProps) {
  // Next.js 15+ params: Promise or object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unwrappedParams = (typeof (params as any)?.then === 'function') ? (require('react').use(params) as { id: string }) : params;
  const { id } = unwrappedParams;
  const idx = Number(id);
  const goal = goals[idx];
  if (!goal) return <div className="text-center py-20 text-white">존재하지 않는 목표입니다.</div>;

  // arc + 랜덤 오프셋 배치
  const subCount = goal.subGoals.length;
  const mainRef = useRef<HTMLDivElement>(null);
  const subRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<{main: {x: number, y: number}, subs: {x: number, y: number, size: number, idx: number}[]}>({main: {x:0, y:0}, subs: []});
  const [randomSeed] = useState(() => Math.floor(Math.random() * 1000000));

  // d3-force 기반 force-directed layout 적용
  React.useEffect(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    const margin = 100;
    const getNodeSize = (progress: number) => 96 + 48 * (progress/100);
    // force 파라미터를 더 세게, 퍼짐을 강화
    const N = goal.subGoals.length + 1;
    const chargeStrength = -2000;
    const linkDistance = 320;
    const linkStrength = 1;
    // 노드 데이터 준비 (중심+서브), 초기 위치를 원형+랜덤 분포로
    const nodes = [
      { id: 'main', size: getNodeSize(goal.progress), x: width/2, y: height/2 },
      ...goal.subGoals.map((sub, i) => {
        const angle = (2 * Math.PI * i) / goal.subGoals.length + Math.PI/8 * seededRandom(randomSeed + i * 100);
        const r = Math.min(width, height) * (0.28 + 0.08 * seededRandom(randomSeed + i * 200));
        return {
          id: String(i),
          size: getNodeSize(sub.progress),
          x: width/2 + r * Math.cos(angle),
          y: height/2 + r * Math.sin(angle)
        };
      })
    ];
    // 링크 데이터 (중심↔서브)
    const links = goal.subGoals.map((_, i) => ({ source: 'main', target: String(i) }));
    // d3-force 시뮬레이션
    const sim = forceSimulation(nodes)
      .force('charge', forceManyBody().strength(chargeStrength).distanceMax(width/1.5))
      .force('center', forceCenter(width/2, height/2))
      .force('x', forceX(width/2).strength(0.04))
      .force('y', forceY(height/2).strength(0.04))
      .force('collide', forceCollide().radius((d: any) => d.size/2 + margin).strength(2.0))
      .force('link', forceLink(links).id((d: any) => d.id).distance(linkDistance).strength(linkStrength))
      .stop();
    for (let i = 0; i < 2000; i++) sim.tick();
    setPositions({
      main: { x: (nodes[0] as any).x, y: (nodes[0] as any).y },
      subs: nodes.slice(1).map((n, i) => ({ x: (n as any).x, y: (n as any).y, size: n.size, idx: i }))
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goal, containerRef.current, randomSeed]);

  return (
    <div className="min-h-screen flex flex-col bg-deep-navy text-glass-white">
      <header className="w-full flex items-center px-8 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-neon-cyan hover:text-neon-purple transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈
        </Link>
      </header>
      <main ref={containerRef} className="flex-1 flex flex-col items-center justify-center gap-12 px-4 overflow-hidden relative">
        {/* 네온 곡선 SVG 오버레이 */}
        <svg className="pointer-events-none absolute left-0 top-0 w-full h-full z-10" width="100%" height="100%"
          viewBox={`0 0 ${containerRef.current?.offsetWidth || 1920} ${containerRef.current?.offsetHeight || 1080}`}
          style={{maxWidth: '100vw', maxHeight: '100vh'}}>
          <defs>
            <filter id="neuron-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#00fff7" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#00fff7" floodOpacity="0.4" />
              <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="#00fff7" floodOpacity="0.2" />
            </filter>
            <filter id="synapse-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff00ff" floodOpacity="0.6" />
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ff00ff" floodOpacity="0.3" />
            </filter>
          </defs>
          {positions.subs.map((sub, idx) => {
            // 곡선 제어점: 메인과 서브 중간 + 랜덤 오프셋으로 organic하게
            const main = positions.main;
            const midX = (main.x + sub.x) / 2;
            const midY = (main.y + sub.y) / 2;
            const offset = 60 + 30 * (Math.random() - 0.5);
            const cpx = midX + offset * (Math.random() - 0.5);
            const cpy = midY + offset * (Math.random() - 0.5);
            return (
              <g key={idx}>
                <path
                  d={`M ${main.x} ${main.y+60} Q ${cpx} ${cpy} ${sub.x} ${sub.y-60}`}
                  stroke="#00fff7"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#neuron-glow)"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* 시냅스 점 */}
                <circle
                  cx={cpx}
                  cy={cpy}
                  r="5"
                  fill="#ff00ff"
                  filter="url(#synapse-glow)"
                  opacity="0.7"
                />
              </g>
            );
          })}
        </svg>
        {/* 메인 목표 뉴런 노드 */}
        <div ref={mainRef} className="absolute left-1/2 top-32 -translate-x-1/2 z-20 group mb-2">
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-glass/80 to-glass/40 border-2 border-neon-cyan/50 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center p-6 hover:scale-105 transition-all duration-300 group-hover:border-neon-cyan">
            <h2 className="text-xl font-bold mb-2 text-white group-hover:text-neon-cyan transition-colors text-center truncate max-w-full">{goal.title}</h2>
            <div className="w-full max-w-40 mx-auto mb-2">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-full transition-all duration-500" style={{width: `${goal.progress}%`}} />
              </div>
              <div className="text-center mt-1">
                <span className="text-neon-cyan text-sm font-medium">{goal.progress}%</span>
              </div>
            </div>
            <div className="flex gap-2 mb-2 flex-wrap justify-center">
              {goal.tags.slice(0,3).map(tag => (
                <span key={tag} className="text-xs border border-neon-cyan/50 rounded-full px-2 py-1 text-neon-cyan bg-white/5 backdrop-blur-sm">{tag}</span>
              ))}
              {goal.tags.length > 3 && (
                <span className="text-xs border border-neon-cyan/30 rounded-full px-2 py-1 text-neon-cyan/60 bg-white/5 backdrop-blur-sm">+{goal.tags.length-3}</span>
              )}
            </div>
            <p className="text-xs text-white/70 text-center max-w-[180px] mx-auto line-clamp-2 overflow-hidden" title={goal.description}>{goal.description}</p>
          </div>
          <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        {/* 서브골 뉴런 노드들 (반원 위에 분산) */}
        {goal.subGoals.map((sub, idx) => (
          <div
            key={sub.title}
            ref={el => { subRefs.current[idx] = el; }}
            className="absolute z-20 group"
            style={{
              left: positions.subs[idx]?.x ? positions.subs[idx].x - positions.subs[idx].size/2 : '50%',
              top: positions.subs[idx]?.y ? positions.subs[idx].y - positions.subs[idx].size/2 : '70%',
              width: positions.subs[idx]?.size || 128,
              height: positions.subs[idx]?.size || 128,
              transition: 'left 0.5s, top 0.5s, width 0.5s, height 0.5s',
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-glass/80 to-glass/40 border-2 border-neon-cyan/50 shadow-lg backdrop-blur-sm flex flex-col items-center justify-center p-4 hover:scale-105 transition-all duration-300 group-hover:border-neon-cyan">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-2
                ${sub.progress === 100 ? 'bg-neon-cyan text-white' : sub.progress > 0 ? 'border-2 border-neon-cyan text-neon-cyan' : 'border-2 border-white/30 text-white/50'}
              `}>{idx + 1}</div>
              <div className="font-semibold text-white mb-1 text-center truncate max-w-full" title={sub.title}>{sub.title}</div>
              <div className="w-full h-2 bg-white/10 rounded mb-2">
                <div className="h-2 bg-neon-cyan rounded" style={{width: `${sub.progress}%`}} />
              </div>
              <div className="flex gap-1 mb-1 flex-wrap justify-center">
                {sub.tags.slice(0,2).map(tag => (
                  <span key={tag} className="text-xs border border-neon-cyan/50 rounded-full px-2 py-1 text-neon-cyan bg-white/5 backdrop-blur-sm">{tag}</span>
                ))}
                {sub.tags.length > 2 && (
                  <span className="text-xs border border-neon-cyan/30 rounded-full px-2 py-1 text-neon-cyan/60 bg-white/5 backdrop-blur-sm">+{sub.tags.length-2}</span>
                )}
              </div>
              <div className="text-xs text-white/60 text-center line-clamp-1 max-w-[100px] mx-auto overflow-hidden" title={sub.description}>{sub.description}</div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
