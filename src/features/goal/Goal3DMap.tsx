import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Goal } from '@/types';

// 4개 카드의 3D 위치를 원형 구조로 배치
const get3DPositions = (): [number, number, number][] => {
  const radius = 3.2;
  const angleStep = (2 * Math.PI) / 4;
  const arr: [number, number, number][] = [];
  for (let i = 0; i < 4; i++) {
    arr.push([
      Math.cos(i * angleStep) * radius,
      0,
      Math.sin(i * angleStep) * radius,
    ]);
  }
  return arr;
};

// 파동/에너지 라인 컴포넌트
function EnergyLine({ start, end, color = '#A259FF', wave = 0.18, speed = 2, width = 0.08 }: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  wave?: number;
  speed?: number;
  width?: number;
}) {
  const ref = useRef<THREE.Line | null>(null);
  // 32개 포인트로 곡선 생성
  const points = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= 32; i++) {
      const t = i / 32;
      arr.push([
        start[0] * (1 - t) + end[0] * t,
        start[1] * (1 - t) + end[1] * t + Math.sin(Math.PI * t) * 1.1,
        start[2] * (1 - t) + end[2] * t,
      ]);
    }
    return arr;
  }, [start, end]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current && ref.current.geometry) {
      const animated = points.map((p, i) => {
        // 파동 애니메이션: y축에 sin 파동 추가
        const waveY = Math.sin(t * speed + i * 0.35) * wave * Math.sin(Math.PI * (i / points.length));
        return new THREE.Vector3(p[0], p[1] + waveY, p[2]);
      });
      (ref.current.geometry as THREE.BufferGeometry).setFromPoints(animated);
    }
  });

  return (
    <Line
      ref={ref}
      points={points.map((p) => new THREE.Vector3(...p))}
      color={color}
      lineWidth={width}
      transparent
      opacity={0.85}
      dashed={false}
    />
  );
}

// 카드 오버레이 컴포넌트
function OverlayCard({ goal, onClose }: { goal: Goal; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10,10,30,0.18)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          minWidth: 340,
          maxWidth: 420,
          width: '90vw',
          minHeight: 220,
          background: 'rgba(20,20,40,0.98)',
          borderRadius: 28,
          boxShadow: `0 0 64px 0 ${
            goal.color === 'purple'
              ? '#A259FFcc'
              : goal.color === 'cyan'
              ? '#00E0FFcc'
              : goal.color === 'pink'
              ? '#FF2E63cc'
              : '#FFEA00cc'
          }`,
          border: `2.5px solid ${
            goal.color === 'purple'
              ? '#A259FF88'
              : goal.color === 'cyan'
              ? '#00E0FF88'
              : goal.color === 'pink'
              ? '#FF2E6388'
              : '#FFEA0088'
          }`,
          color: '#F0F0F5',
          padding: 36,
          fontFamily: 'Poppins, Inter, sans-serif',
          fontWeight: 700,
          fontSize: 26,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          cursor: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          style={{
            position: 'absolute',
            top: 18,
            right: 18,
            background: 'none',
            border: 'none',
            color: '#A259FF',
            fontSize: 28,
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          ×
        </button>
        <div style={{ fontWeight: 800, fontSize: 32, marginBottom: 10, letterSpacing: -0.5 }}>{goal.title}</div>
        <div style={{ fontWeight: 400, fontSize: 18, opacity: 0.8, marginBottom: 18, minHeight: 28 }}>{goal.description}</div>
        <div style={{ height: 16, width: '100%', background: '#222', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ width: `${goal.progress}%`, height: '100%', background: goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00', borderRadius: 8, boxShadow: `0 0 16px ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}80` }} />
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          {goal.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: 16, background: '#3337', borderRadius: 12, padding: '4px 18px', fontWeight: 500 }}>{tag}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 8px #A259FF55' }}>상세 보기</button>
          <button style={{ background: '#A259FF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 8px #A259FF' }}>진행</button>
        </div>
      </div>
    </div>
  );
}

// 3D 카드(Plane + Html 오버레이, hover/선택 효과, 클릭 시 중앙 이동/확대)
function GoalCard3D({ goal, position, selected, onClick, dimmed }: {
  goal: Goal;
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
  dimmed: boolean;
}) {
  const meshRef = useRef<THREE.Group | null>(null);
  // 상태별 타겟값
  const targetPos: [number, number, number] = selected ? [0, 0, 0.3] : position;
  const targetScale = selected ? 1.45 : dimmed ? 0.85 : 1;
  const targetOpacity = selected ? 1 : dimmed ? 0.5 : 1;
  const targetBlur = selected ? 0 : dimmed ? 1.5 : 0;
  // lerp 상태
  const scale = useRef(targetScale);
  const opacity = useRef(targetOpacity);
  const blur = useRef(targetBlur);
  useFrame(() => {
    const mesh = meshRef.current;
    if (mesh) {
      // position lerp
      const pos = new THREE.Vector3(...targetPos);
      if (mesh.position.distanceTo(pos) > 0.01) {
        mesh.position.lerp(pos, 0.18);
      } else {
        mesh.position.copy(pos);
      }
      // scale lerp
      scale.current += (targetScale - scale.current) * 0.18;
      mesh.scale.lerp(new THREE.Vector3(scale.current, scale.current, scale.current), 0.18);
      // opacity lerp
      opacity.current += (targetOpacity - opacity.current) * 0.18;
      // blur lerp
      blur.current += (targetBlur - blur.current) * 0.18;
    }
  });
  const [hovered, setHovered] = useState(false);
  return (
    <group
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <mesh castShadow receiveShadow>
        <planeGeometry args={[selected ? 4.2 : 2.2, selected ? 2.6 : 1.2]} />
        <meshStandardMaterial
          color="#19192c"
          roughness={0.18}
          metalness={0.7}
          emissive={
            goal.color === 'purple' ? '#A259FF' :
            goal.color === 'cyan' ? '#00E0FF' :
            goal.color === 'pink' ? '#FF2E63' : '#FFEA00'
          }
          emissiveIntensity={selected ? 0.6 : hovered ? 0.32 : 0.12}
          transparent
          opacity={opacity.current}
        />
      </mesh>
      <Html
        center
        style={{
          width: selected ? 340 : 180,
          height: selected ? 200 : 100,
          borderRadius: selected ? 24 : 14,
          background: selected ? 'rgba(20,20,40,0.97)' : 'rgba(20,20,40,0.92)',
          boxShadow: selected
            ? `0 0 64px 0 ${
                goal.color === 'purple'
                  ? '#A259FFcc'
                  : goal.color === 'cyan'
                  ? '#00E0FFcc'
                  : goal.color === 'pink'
                  ? '#FF2E63cc'
                  : '#FFEA00cc'
              }`
            : hovered
            ? `0 0 32px 0 ${
                goal.color === 'purple'
                  ? '#A259FFcc'
                  : goal.color === 'cyan'
                  ? '#00E0FFcc'
                  : goal.color === 'pink'
                  ? '#FF2E63cc'
                  : '#FFEA00cc'
              }`
            : `0 0 10px 0 ${
                goal.color === 'purple'
                  ? '#A259FF66'
                  : goal.color === 'cyan'
                  ? '#00E0FF66'
                  : goal.color === 'pink'
                  ? '#FF2E6366'
                  : '#FFEA0066'
              }`,
          border: selected
            ? `2.5px solid ${
                goal.color === 'purple'
                  ? '#A259FF88'
                  : goal.color === 'cyan'
                  ? '#00E0FF88'
                  : goal.color === 'pink'
                  ? '#FF2E6388'
                  : '#FFEA0088'
              }`
            : `1.2px solid ${
                goal.color === 'purple'
                  ? '#A259FF44'
                  : goal.color === 'cyan'
                  ? '#00E0FF44'
                  : goal.color === 'pink'
                  ? '#FF2E6344'
                  : '#FFEA0044'
              }`,
          color: '#F0F0F5',
          padding: selected ? 32 : 12,
          fontFamily: 'Poppins, Inter, sans-serif',
          fontWeight: selected ? 700 : 600,
          fontSize: selected ? 26 : 15,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'auto',
          transition: 'all 0.18s cubic-bezier(.4,2,.6,1)',
          cursor: 'pointer',
          opacity: opacity.current,
          filter: `blur(${blur.current}px)`,
          zIndex: selected ? 10 : 1,
        }}
        distanceFactor={selected ? 1.6 : 1.1}
      >
        {selected ? (
          <>
            <button
              onClick={e => { e.stopPropagation(); onClick(); }}
              aria-label="닫기"
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                color: '#A259FF',
                fontSize: 28,
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              ×
            </button>
            <div style={{ fontWeight: 800, fontSize: 32, marginBottom: 10, letterSpacing: -0.5 }}>{goal.title}</div>
            <div style={{ fontWeight: 400, fontSize: 18, opacity: 0.8, marginBottom: 18, minHeight: 28 }}>{goal.description}</div>
            <div style={{ height: 16, width: '100%', background: '#222', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${goal.progress}%`, height: '100%', background: goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00', borderRadius: 8, boxShadow: `0 0 16px ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}80` }} />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
              {goal.tags.map((tag, i) => (
                <span key={i} style={{ fontSize: 16, background: '#3337', borderRadius: 12, padding: '4px 18px', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 8px #A259FF55' }}>상세 보기</button>
              <button style={{ background: '#A259FF', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer', boxShadow: '0 0 8px #A259FF' }}>진행</button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, letterSpacing: -0.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{goal.title}</div>
            <div style={{ height: 7, width: '100%', background: '#222', borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
              <div style={{ width: `${goal.progress}%`, height: '100%', background: goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00', borderRadius: 4, boxShadow: `0 0 8px ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}80` }} />
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              {goal.tags.slice(0, 2).map((tag, i) => (
                <span key={i} style={{ fontSize: 11, background: '#3337', borderRadius: 8, padding: '2px 10px', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </>
        )}
      </Html>
    </group>
  );
}

// 카메라 포커스 애니메이션
function CameraFocus({ target }: { target: [number, number, number] }) {
  const { camera, controls } = useThree();
  const targetVec = useMemo(() => new THREE.Vector3(...target), [target]);
  useFrame(() => {
    // 카메라 position을 부드럽게 보간
    const desired = targetVec.clone().add(new THREE.Vector3(0, 0, 8));
    camera.position.lerp(desired, 0.08);
    // OrbitControls의 target도 부드럽게 보간
    if (controls && (controls as any).target && (controls as any).update) {
      (controls as any).target.lerp(targetVec, 0.08);
      (controls as any).update();
    }
  });
  return null;
}

export default function Goal3DMap({ goals }: { goals: Goal[] }) {
  const getBalanced3DPositions = (): [number, number, number][] => {
    const radius = 8.5;
    const angleStep = (2 * Math.PI) / 4;
    const arr: [number, number, number][] = [];
    for (let i = 0; i < 4; i++) {
      arr.push([
        Math.cos(i * angleStep) * radius,
        0,
        Math.sin(i * angleStep) * radius,
      ]);
    }
    return arr;
  };
  const positions: [number, number, number][] = getBalanced3DPositions();
  const [selected, setSelected] = useState<number | null>(null);
  // ESC로 닫기
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: '90vh',
        minHeight: 500,
        maxHeight: 900,
        borderRadius: 24,
        overflow: 'hidden',
        background: '#0D0D2B',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Canvas camera={{ position: [0, 1.5, 13], fov: 40 }} shadows>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <OrbitControls
          enablePan={false}
          minDistance={7}
          maxDistance={16}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 3.2}
        />
        {/* 카메라 포커스 애니메이션 */}
        <CameraFocus target={[0, 0, 0]} />
        {/* 카드 노드 */}
        {goals.slice(0, 4).map((goal, i) => (
          <GoalCard3D
            key={goal.id}
            goal={goal}
            position={positions[i]}
            selected={selected === i}
            dimmed={selected !== null && selected !== i}
            onClick={() => setSelected(selected === i ? null : i)}
          />
        ))}
        {/* 에너지 파동 라인 (모든 쌍 연결) */}
        <EnergyLine start={positions[0]} end={positions[1]} color="#A259FF" />
        <EnergyLine start={positions[0]} end={positions[2]} color="#00E0FF" />
        <EnergyLine start={positions[0]} end={positions[3]} color="#FF2E63" />
        <EnergyLine start={positions[1]} end={positions[2]} color="#FFEA00" />
        <EnergyLine start={positions[1]} end={positions[3]} color="#A259FF" />
        <EnergyLine start={positions[2]} end={positions[3]} color="#00E0FF" />
        {/* Glow 효과 */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={2.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}