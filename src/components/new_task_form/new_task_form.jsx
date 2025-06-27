import React, { useState } from 'react'
import './new_task_form.css'

function NewTaskForm({ task, onInputChange, addTaskToList, focusOnInput }) {
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const minutes = Number(min) || 0
    const seconds = Number(sec) || 0
    const sanitizedMin = Math.min(600, Math.max(0, minutes))
    const sanitizedSec = Math.min(59, Math.max(0, seconds))

    addTaskToList(task, sanitizedMin, sanitizedSec)

    setMin('')
    setSec('')
  }

  return (
    <div className="input-container">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="input"
          onChange={onInputChange}
          placeholder="Введите текст"
          value={task}
          maxLength={30}
          ref={focusOnInput}
        />
        <input
          className="input-min"
          type="number"
          placeholder="Min"
          onChange={(e) => setMin(e.target.value)}
          value={min}
          min={0}
          max={600}
        />
        <input
          className="input-sec"
          type="number"
          placeholder="Sec"
          onChange={(e) => setSec(e.target.value)}
          value={sec}
          min={0}
          max={59}
        />
        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
