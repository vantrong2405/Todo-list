import styles from './taskList.module.scss'
import { Todo } from '../@types/todo.type'
import { ChangeEvent } from 'react'
interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneTodo: (id: string, done: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { doneTaskList, handleDoneTodo, todos, startEditTodo, deleteTodo } = props
  const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    handleDoneTodo(id, event.target.checked)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              className={styles.taskCheckbox}
              checked={todo.done}
              onChange={(e) => onChangeCheckbox(e, todo.id)}
            />
            <span className={styles.taskName}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
                🖊️
              </button>
              <button className={styles.taskBtn} onClick={(e) => deleteTodo(todo.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
