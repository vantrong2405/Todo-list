import { useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../@types/todo.type'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const notdoneTodos = todos.filter((value) => value.done === false)
  const doneTodos = todos.filter((value) => value.done === true)
  console.log('<<<<<<not', notdoneTodos)
  console.log('<<<<<<done', doneTodos)

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
  }

  const handleDoneTodo = (id: string, done: boolean) => {
    //Change state todo -> done or not done
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) return { ...todo, done: done }
        return todo
      })
    })
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} />
        <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} />
      </div>
    </div>
  )
}
