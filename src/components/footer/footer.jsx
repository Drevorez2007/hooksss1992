import React from 'react'
import './footer.css'

function Footer({ tasks, filter, setFilter, clearCompleted }) {
  const activeTasksCount = tasks.filter((task) => !task.done).length

  return (
    <footer className="footer">
      <span className="task-count">{activeTasksCount} осталось</span>

      <div className="filters">
        <button
          className={filter === 'all' ? 'selected' : ''}
          onClick={() => setFilter('all')}
        >
          Все
        </button>
        <button
          className={filter === 'active' ? 'selected' : ''}
          onClick={() => setFilter('active')}
        >
          Активные
        </button>
        <button
          className={filter === 'completed' ? 'selected' : ''}
          onClick={() => setFilter('completed')}
        >
          Завершённые
        </button>
      </div>

      <button className="clear-completed" onClick={clearCompleted}>
        Очистить завершённые
      </button>
    </footer>
  )
}

export default Footer
