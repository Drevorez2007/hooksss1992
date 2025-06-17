import { React, useState } from 'react'
import Task from '../task/task'

function TaskList({
  arrayTask,
  onDelete,
  onTextChange,
  toggleRunning,
  updateTaskTime,
  toggleDone
}) {
  return (
    <ul className="task-list">
      {arrayTask.map((task) => (
        <Task
          key={task.id}
          id={task.id}
          text={task.task}
          done={task.done}
          time={task.time}
          isRunning={task.isRunning}
          toggleRunning={toggleRunning}
          updateTaskTime={updateTaskTime}
          onTextChange={onTextChange}
          onDelete={onDelete}
          mode={task.mode}
          toggleDone={toggleDone}
        />
      ))}
    </ul>
  )
}

export default TaskList
