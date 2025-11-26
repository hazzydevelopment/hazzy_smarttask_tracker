import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItem'
import { useTasks } from './store/useTasks'

export default function App() {
  const tasks = useTasks(state => state.tasks)

  const scoreOf = (task) => {
    const p = task.priority === 'high' ? 3 : task.priority === 'medium' ? 2 : 1
    return p * 3 + task.difficulty * 2 + task.time
  }

  const sorted = [...tasks].sort((a, b) => scoreOf(b) - scoreOf(a))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Smart Task Tracker</h1>

        <TaskForm />

        <div className="mt-6 space-y-3">
          {sorted.length === 0 && (
            <p className="text-center text-sm text-gray-500">No tasks yet — add one above.</p>
          )}
          {sorted.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </div>
      </div>
    </div>
  )
}
