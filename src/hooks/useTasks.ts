// src/hooks/useTasks.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { DailyTask } from '@/types';

export function useTasks() {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dmedClient.fetchTasks();
      setTasks(data);
    } catch (e) {
      console.error('Failed to load tasks', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const completeTask = useCallback(async (id: string) => {
    // Optimistic update
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: 'completed', completedAt: new Date().toISOString() }
          : t
      )
    );
    try {
      await dmedClient.updateTask(id, 'completed');
    } catch (e) {
      // Rollback on error
      console.error('Failed to update task', e);
      refetch();
    }
  }, [refetch]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return { tasks, loading, completeTask, refetch, stats };
}
