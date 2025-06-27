import React, { useState } from 'react'
import './new_task_form.css'

function NewTaskForm({ task, onInputChange, addTaskToList, focusOnInput }) {
  const [min, setMin] = useState(0)
  const [sec, setSec] = useState(0)

  return (
    <div className="input-container">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addTaskToList(task, min, sec)
          setMin(0)
          setSec(0)
        }}
      >
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
          onChange={(e) =>
            setMin(Math.min(600, Math.max(0, Number(e.target.value))))
          }
          value={min}
        />

        <input
          className="input-sec"
          type="number"
          placeholder="Sec"
          onChange={(e) =>
            setSec(Math.min(600, Math.max(0, Number(e.target.value))))
          }
          value={sec}
        />
        <button type="submit" style={{ display: 'none' }}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewTaskForm
