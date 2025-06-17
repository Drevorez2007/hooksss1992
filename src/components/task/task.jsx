import { React, useState } from 'react'
import Checkbox from 'antd/es/checkbox/Checkbox'
import TaskList from '../task_list/task_list'
import './task.css'
import Timer from '../timer/timer'

function Task({
  id,
  text,
  done,
  onTextChange,
  onDelete,
  time,
  isRunning,
  toggleRunning,
  updateTaskTime,
  mode,
  toggleDone,
}) {
  const [isEditing, setIsEditing] = useState(false)

  const formatTime = (num) => num.toString().padStart(2, '0')

  return (
    <li className="task-item">
      <input type="checkbox" checked={done} onChange={() => toggleDone(id)} />

      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(id, e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
        />
      ) : (
        <span className={`task-text ${done ? 'done' : ''}`}>{text}</span>
      )}

      <Timer
        id={id}
        time={time}
        isRunning={isRunning}
        toggleRunning={toggleRunning}
        updateTaskTime={updateTaskTime}
        mode={mode}
      />

      <span>
        <img
          className="icon-delete"
          onClick={() => onDelete(id)}
          src="./delete.svg"
          alt="Удалить"
        />
      </span>

      <span>
        <img
          className="icon-edit"
          onClick={() => setIsEditing(true)}
          src="./change.svg"
          alt="Редактировать"
        />
      </span>
    </li>
  )
}

export default Task
