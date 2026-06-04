import type { Status, Priority } from '../../shared/types';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: Status;
  priority: Priority;
  project_id: number | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  priority?: Priority;
  project_id?: number | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: Status;
  priority?: Priority;
  project_id?: number | null;
}

export interface FindTasksOptions {
  status?: Status;
  projectId?: number;
}
