import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Goal } from '@/types';

// 4개 카드의 3D 위치를 계산 (정사면체 형태)
const get3DPositions = (): [number, number, number][] => [
  [2, 1, 0],
  [-2, 1, 0],
  [0, -1.5, 2],
  [0, -1.5, -2],
];

// 네온 라인(간단한 TubeGeometry)
function NeonLine({ start, end, color = '#A259FF' }: { start: [number, number, number]; end: [number, number, number]; color?: string }) {
  const curve = React.useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(...start),
    new THREE.Vector3(
      (start[0] + end[0]) / 2,
      (start[1] + end[1]) / 2 + 1,
      (start[2] + end[2]) / 2
    ),
    new THREE.Vector3(...end),
  ]), [start, end]);
  const tube = React.useMemo(() => new THREE.TubeGeometry(curve, 20, 0.06, 8, false), [curve]);
  return (
    <mesh geometry={tube}>
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

// 3D 카드(Plane + Html 오버레이)
function GoalCard3D({ goal, position }: { goal: Goal; position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 카드 Plane */}
      <mesh>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial color="#18182b" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* 카드 내용: Html 오버레이 */}
      <Html center style={{ pointerEvents: 'auto' }} distanceFactor={1.2}>
        <div
          style={{
            width: 200,
            height: 110,
            borderRadius: 16,
            background: 'rgba(20,20,40,0.85)',
            boxShadow: `0 0 24px ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}80`,
            border: `1.5px solid ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}40`,
            color: '#F0F0F5',
            padding: 16,
            fontFamily: 'Poppins, Inter, sans-serif',
            fontWeight: 600,
            fontSize: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{goal.title}</div>
          <div style={{ fontWeight: 400, fontSize: 13, opacity: 0.7, marginBottom: 8 }}>{goal.description}</div>
          <div style={{ height: 6, width: '100%', background: '#222', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }}>
            <div style={{ width: `${goal.progress}%`, height: '100%', background: goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00', borderRadius: 4, boxShadow: `0 0 8px ${goal.color === 'purple' ? '#A259FF' : goal.color === 'cyan' ? '#00E0FF' : goal.color === 'pink' ? '#FF2E63' : '#FFEA00'}80` }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {goal.tags.slice(0, 3).map((tag, i) => (
              <span key={i} style={{ fontSize: 11, background: '#3336', borderRadius: 8, padding: '2px 8px' }}>{tag}</span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default function Goal3DMap({ goals }: { goals: Goal[] }) {
  const positions: [number, number, number][] = get3DPositions();
  return (
    <div style={{ width: '100%', height: 500, borderRadius: 24, overflow: 'hidden', background: '#0D0D2B' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={0.7} />
        <OrbitControls enablePan enableZoom enableRotate />
        {/* 카드 노드 */}
        {goals.slice(0, 4).map((goal, i) => (
          <GoalCard3D key={goal.id} goal={goal} position={positions[i]} />
        ))}
        {/* 네온 라인 (모든 쌍 연결) */}
        <NeonLine start={positions[0]} end={positions[1]} color="#A259FF" />
        <NeonLine start={positions[0]} end={positions[2]} color="#00E0FF" />
        <NeonLine start={positions[0]} end={positions[3]} color="#FF2E63" />
        <NeonLine start={positions[1]} end={positions[2]} color="#FFEA00" />
        <NeonLine start={positions[1]} end={positions[3]} color="#A259FF" />
        <NeonLine start={positions[2]} end={positions[3]} color="#00E0FF" />
      </Canvas>
    </div>
  );
}