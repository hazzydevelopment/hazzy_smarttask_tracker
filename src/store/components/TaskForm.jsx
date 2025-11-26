import { useState } from 'react'
import { useTasks } from '../store/useTasks'

export default function TaskForm() {
  const addTask = useTasks(state => state.addTask)

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [difficulty, setDifficulty] = useState(2)
  const [time, setTime] = useState(30)

  const submit = (e) => {
    e?.preventDefault?.()
    if (!title.trim()) return

    addTask({
      id: Date.now(),
      title: title.trim(),
      priority,
      difficulty: Number(difficulty),
      time: Number(time)
    })

    setTitle('')
    setPriority('medium')
    setDifficulty(2)
    setTime(30)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="flex-1 p-2 border rounded-md outline-none"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-2 border rounded-md">
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>

        <input
          type="number"
          min="1"
          max="5"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="Difficulty (1-5)"
        />

        <input
          type="number"
          min="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded-md"
          placeholder="Estimated time (min)"
        />
      </div>
    </form>
  )
}
