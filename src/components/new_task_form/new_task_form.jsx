import React from 'react'
import { useState } from 'react'
import './new_task_form.css'
function NewTaskForm({
  task,
  onInputChange,
  addTaskToList,
  done,
  min,
  sec,
  saveMin,
  saveSec,
  focusOnInput,
}) {
  return (
    <div className="input-container">
      {
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addTaskToList(e)
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
            onChange={saveMin}
            value={min}
          />

          <input
            className="input-sec"
            type="number"
            placeholder="Sec"
            onChange={saveSec}
            value={sec}
          />
          <button type="submit" style={{ display: 'none' }}>
            Submit
          </button>
        </form>
      }
    </div>
  )
}

export default NewTaskForm
