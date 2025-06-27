import React, { useState, useEffect, useRef } from 'react'
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
  const [editText, setEditText] = useState(text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      setEditText(text)

      inputRef.current?.focus()
    }
  }, [isEditing, text])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onTextChange(id, editText.trim())
      setIsEditing(false)
    } else if (e.key === 'Escape') {
      setIsEditing(false)
      setEditText(text)
    }
  }

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60)
    const sec = totalSeconds % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (!isEditing) return

    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEditing(false)
        setEditText(text)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, text])

  return (
    <li className="task-item">
      <input type="checkbox" checked={done} onChange={() => toggleDone(id)} />

      {isEditing ? (
        <input
          type="text"
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={onKeyDown}
        />
      ) : (
        <span
          className={`task-text ${done ? 'done' : ''}`}
          onClick={() => setIsEditing(true)}
        >
          {text}
        </span>
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
