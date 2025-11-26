import { create } from 'zustand'

const STORAGE_KEY = 'st_tasks_v1'

export const useTasks = create((set, get) => ({
  tasks: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

  addTask: (task) => {
    const updated = [...get().tasks, task]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  removeTask: (id) => {
    const updated = get().tasks.filter(t => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  updateTask: (id, updatedTask) => {
    const updated = get().tasks.map(t => (t.id === id ? updatedTask : t))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    set({ tasks: updated })
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEY)
    set({ tasks: [] })
  }
}))
