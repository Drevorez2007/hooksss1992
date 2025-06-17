import { useEffect, useRef } from 'react'

function Timer({ id, time, isRunning, toggleRunning, updateTaskTime, mode }) {
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        updateTaskTime(id, (prevTime) => {
          if (mode === 'down') {
            const newTime = prevTime - 1
            if (newTime <= 0) {
              toggleRunning(id, false)
              return 0
            }
            return newTime
          } else if (mode === 'up') {
            return prevTime + 1
          }
          return prevTime
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, id, updateTaskTime, toggleRunning, mode])

  const format = (num) => num.toString().padStart(2, '0')

  const handleStart = () => {
    toggleRunning(id, true)
  }

  const handleStop = () => {
    toggleRunning(id, false)
  }

  return (
    <div className="timer">
      <button onClick={handleStart}>▶</button>
      <button onClick={handleStop}>⏸</button>
      <span>
        {format(Math.floor(time / 60))}:{format(time % 60)}
      </span>
    </div>
  )
}

export default Timer
