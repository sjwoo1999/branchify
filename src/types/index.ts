export interface Goal {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'completed' | 'paused';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  parentId?: string;
  children: Goal[];
  progress: number; // 0-100
  color: 'purple' | 'cyan' | 'pink' | 'yellow';
  tags: string[];
}

export interface Routine {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  goalId: string;
  completedDates: Date[];
  streak: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
    language: 'ko' | 'en';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface GoalNode {
  id: string;
  x: number;
  y: number;
  goal: Goal;
  connections: string[]; // 연결된 노드들의 ID
}

export interface EnergyLine {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  strength: number; // 0-1
  color: string;
}

export interface Notification {
  id: string;
  type: 'goal' | 'routine' | 'achievement' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface GoalMapData {
  nodes: GoalNode[];
  lines: EnergyLine[];
  centerNodeId?: string;
}

export interface CreateGoalRequest {
  title: string;
  description?: string;
  parentId?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  color: 'purple' | 'cyan' | 'pink' | 'yellow';
  tags?: string[];
}

export interface UpdateGoalRequest {
  id: string;
  title?: string;
  description?: string;
  status?: 'active' | 'completed' | 'paused';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  color?: 'purple' | 'cyan' | 'pink' | 'yellow';
  tags?: string[];
}

export interface CreateRoutineRequest {
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  goalId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 