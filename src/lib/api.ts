import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Goal, 
  Routine, 
  User, 
  CreateGoalRequest, 
  UpdateGoalRequest, 
  CreateRoutineRequest,
  ApiResponse 
} from '@/types';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Goals API
  async getGoals(): Promise<Goal[]> {
    const response = await this.client.get<ApiResponse<Goal[]>>('/goals');
    return response.data.data || [];
  }

  async getGoal(id: string): Promise<Goal> {
    const response = await this.client.get<ApiResponse<Goal>>(`/goals/${id}`);
    return response.data.data!;
  }

  async createGoal(goalData: CreateGoalRequest): Promise<Goal> {
    const response = await this.client.post<ApiResponse<Goal>>('/goals', goalData);
    return response.data.data!;
  }

  async updateGoal(id: string, goalData: UpdateGoalRequest): Promise<Goal> {
    const response = await this.client.put<ApiResponse<Goal>>(`/goals/${id}`, goalData);
    return response.data.data!;
  }

  async deleteGoal(id: string): Promise<void> {
    await this.client.delete<ApiResponse<void>>(`/goals/${id}`);
  }

  async completeGoal(id: string): Promise<Goal> {
    const response = await this.client.patch<ApiResponse<Goal>>(`/goals/${id}/complete`);
    return response.data.data!;
  }

  // Routines API
  async getRoutines(): Promise<Routine[]> {
    const response = await this.client.get<ApiResponse<Routine[]>>('/routines');
    return response.data.data || [];
  }

  async getRoutinesByGoal(goalId: string): Promise<Routine[]> {
    const response = await this.client.get<ApiResponse<Routine[]>>(`/goals/${goalId}/routines`);
    return response.data.data || [];
  }

  async createRoutine(routineData: CreateRoutineRequest): Promise<Routine> {
    const response = await this.client.post<ApiResponse<Routine>>('/routines', routineData);
    return response.data.data!;
  }

  async completeRoutine(id: string): Promise<Routine> {
    const response = await this.client.patch<ApiResponse<Routine>>(`/routines/${id}/complete`);
    return response.data.data!;
  }

  async deleteRoutine(id: string): Promise<void> {
    await this.client.delete<ApiResponse<void>>(`/routines/${id}`);
  }

  // User API
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>('/user/profile');
    return response.data.data!;
  }

  async updateUserProfile(userData: Partial<User>): Promise<User> {
    const response = await this.client.put<ApiResponse<User>>('/user/profile', userData);
    return response.data.data!;
  }

  // Analytics API
  async getGoalAnalytics(goalId: string): Promise<any> {
    const response = await this.client.get<ApiResponse<any>>(`/goals/${goalId}/analytics`);
    return response.data.data;
  }

  async getDashboardStats(): Promise<any> {
    const response = await this.client.get<ApiResponse<any>>('/dashboard/stats');
    return response.data.data;
  }
}

export const apiClient = new ApiClient();
export default apiClient; 