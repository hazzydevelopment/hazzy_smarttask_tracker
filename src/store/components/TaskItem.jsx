import { useState } from 'react'
import { useTasks } from '../store/useTasks'

export default function TaskItem({ task }) {
  const removeTask = useTasks(state => state.removeTask)
  const updateTask = useTasks(state => state.updateTask)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  const score = (priority) => (priority === 'high' ? 3 : priority === 'medium' ? 2 : 1)
  const totalScore = score(task.priority) * 3 + task.difficulty * 2 + task.time

  const save = () => {
    updateTask(task.id, { ...task, title: title.trim() || task.title })
    setEditing(false)
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between border">
      <div className="flex-1">
        {editing ? (
          <div className="flex gap-2">
            <input className="flex-1 p-1 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={save}>Save</button>
            <button className="px-2 py-1 bg-gray-300 rounded" onClick={() => { setEditing(false); setTitle(task.title) }}>Cancel</button>
          </div>
        ) : (
          <>
            <div className="flex items-baseline justify-between">
              <h3 className="font-medium">{task.title}</h3>
              <span className="text-sm text-gray-500">Score: {totalScore}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {task.priority} • difficulty: {task.difficulty} • time: {task.time} min
            </p>
          </>
        )}
      </div>

      {!editing && (
        <div className="flex gap-2 ml-4">
          <button onClick={() => setEditing(true)} className="px-2 py-1 text-sm bg-yellow-100 rounded">Edit</button>
          <button onClick={() => removeTask(task.id)} className="px-2 py-1 text-sm bg-red-100 rounded">Delete</button>
        </div>
      )}
    </div>
  )
}
