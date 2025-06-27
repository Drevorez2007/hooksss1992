import React from 'react'
import './timer.css'

function Timer({ id, time, isRunning, toggleRunning }) {
  const format = (num) => num.toString().padStart(2, '0')

  return (
    <div className="timer">
      {!isRunning && (
        <button className="play" onClick={() => toggleRunning(id, true)}>
          ▶
        </button>
      )}
      {isRunning && (
        <button className="stop" onClick={() => toggleRunning(id, false)}>
          ⏸
        </button>
      )}
      <span>
        {format(Math.floor(time / 60))}:{format(time % 60)}
      </span>
    </div>
  )
}

export default Timer
