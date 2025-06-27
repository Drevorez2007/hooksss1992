import { useState, useEffect, useRef } from 'react'
import './App.css'
import NewTaskForm from '../new_task_form/new_task_form'
import TaskList from '../task_list/task_list'
import Footer from '../footer/footer'

function App() {
  const [task, setTask] = useState('')
  const [arrayTask, setArrayTask] = useState([])
  const focusOnInput = useRef()
  const [filter, setFilter] = useState('all')
  const timersRef = useRef({})

  const updateTaskTime = (id, newTimeOrUpdater) => {
    setArrayTask((tasks) =>
      tasks.map((task) => {
        if (task.id === id) {
          const newTime =
            typeof newTimeOrUpdater === 'function'
              ? newTimeOrUpdater(task.time)
              : newTimeOrUpdater

          if (task.mode === 'down' && newTime <= 0) {
            return { ...task, time: 0, isRunning: false }
          }
          return { ...task, time: newTime >= 0 ? newTime : 0 }
        }
        return task
      }),
    )
  }

  const updateRunningState = (id, isRunning) => {
    setArrayTask((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, isRunning } : task)),
    )
  }

  useEffect(() => {
    arrayTask.forEach((task) => {
      const isActive = task.isRunning
      const exists = timersRef.current[task.id]

      if (isActive && !exists) {
        timersRef.current[task.id] = setInterval(() => {
          updateTaskTime(task.id, (prevTime) => {
            if (task.mode === 'down') {
              const newTime = prevTime - 1
              if (newTime <= 0) {
                clearInterval(timersRef.current[task.id])
                delete timersRef.current[task.id]
                updateRunningState(task.id, false)
                return 0
              }
              return newTime
            } else if (task.mode === 'up') {
              return prevTime + 1
            }
            return prevTime
          })
        }, 1000)
      }

      if (!isActive && exists) {
        clearInterval(timersRef.current[task.id])
        delete timersRef.current[task.id]
      }
    })

    return () => {
      Object.values(timersRef.current).forEach(clearInterval)
      timersRef.current = {}
    }
  }, [arrayTask])

  const onDelete = (id) => {
    setArrayTask((prev) => prev.filter((task) => task.id !== id))
    if (timersRef.current[id]) {
      clearInterval(timersRef.current[id])
      delete timersRef.current[id]
    }
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

  const onTextChange = (id, newValue) => {
    setArrayTask((prev) =>
      prev.map((task) => (task.id === id ? { ...task, task: newValue } : task)),
    )
  }

  const addTaskToList = (taskText, min, sec) => {
    if (!taskText.trim()) {
      alert('Введите задачу!')
      return
    }

    const totalSeconds = Math.max(0, Number(min) * 60 + Number(sec))
    const id = Date.now()

    setArrayTask((prev) => [
      ...prev,
      {
        id,
        task: taskText,
        done: false,
        isRunning: false,
        time: totalSeconds,
        mode: totalSeconds > 0 ? 'down' : 'up',
      },
    ])

    setTask('')
  }

  return (
    <div className="container">
      <div className="main">
        <NewTaskForm
          task={task}
          onInputChange={(e) => setTask(e.target.value)}
          addTaskToList={addTaskToList}
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
          toggleRunning={updateRunningState}
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
