
import { useState, useRef } from 'react'
import './App.css'
import NewTaskForm from '../new_task_form/new_task_form'
import TaskList from '../task_list/task_list'
import Footer from '../footer/footer'

function App() {
  const [task, setTask] = useState('')
  const [arrayTask, setArrayTask] = useState([])
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)
  const focusOnInput = useRef()
  const [filter, setFilter] = useState('all')

  const updateTaskTime = (id, newTimeOrUpdater) => {
    setArrayTask((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          const newTime =
            typeof newTimeOrUpdater === 'function'
              ? newTimeOrUpdater(task.time, task.mode)
              : newTimeOrUpdater

          if (task.mode === 'down' && newTime < 0)
            return { ...task, time: 0, isRunning: false }
          if (task.mode === 'up')
            return { ...task, time: newTime >= 0 ? newTime : 0 }

          return { ...task, time: newTime >= 0 ? newTime : 0 }
        }
        return task
      }),
    )
  }

  const toggleDone = (id) => {
  setArrayTask((prev) =>
    prev.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    ),
  )
}

  const clearCompleted = () => {
    setArrayTask((prev) => prev.filter((task) => !task.done))
  }

  const onDelete = (id) => {
    setArrayTask((prev) => prev.filter((task) => task.id !== id))
  }

  const onTextChange = (id, newValue) => {
    setArrayTask((prev) =>
      prev.map((task) => (task.id === id ? { ...task, task: newValue } : task)),
    )
  }

  const toggleRunning = (id, running) => {
    setArrayTask((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, isRunning: running } : task,
      ),
    )
  }

  const addTaskToList = (e) => {
    e.preventDefault()
    if (!task.trim()) {
      alert('Введите задачу!')
      return
    }
    const totalSeconds = Math.max(0, Number(min) * 60 + Number(sec))
    const id = Date.now()

    setArrayTask((prev) => [
      ...prev,
      {
        id,
        task,
        done: false,
        isRunning: false,
        time: totalSeconds,
        mode: totalSeconds > 0 ? 'down' : 'up',
      },
    ])

    setTask('')
    setMin(0)
    setSec(0)
  }

  return (
    <div className="container">
      <div className="main">
        <NewTaskForm
          task={task}
          onInputChange={(e) => setTask(e.target.value)}
          addTaskToList={addTaskToList}
          min={min}
          sec={sec}
          saveMin={(e) =>
            setMin(Math.min(600, Math.max(0, Number(e.target.value))))
          }
          saveSec={(e) =>
            setSec(Math.min(600, Math.max(0, Number(e.target.value))))
          }
          focusOnInput={focusOnInput}
        />
        <TaskList
          arrayTask={
            filter === 'all'
              ? arrayTask
              : filter === 'active'
                ? arrayTask.filter((task) => !task.done)
                : arrayTask.filter((task) => task.done)
          }
          toggleRunning={toggleRunning}
          updateTaskTime={updateTaskTime}
          onDelete={onDelete}
          onTextChange={onTextChange}
          toggleDone={toggleDone}
        />
        <Footer
          tasks={arrayTask}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </div>
    </div>
  )
}

export default App
