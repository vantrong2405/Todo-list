import { useEffect, useState } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Todo } from '../@types/todo.type'
import { stringify } from 'querystring'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState<null | Todo>(null)
  const notdoneTodos = todos.filter((value) => value.done === false)
  const doneTodos = todos.filter((value) => value.done === true)

  useEffect(() => {
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')// mảng được lưu ở localStorage
    setTodos(todoObj);
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])

    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')// mảng được lưu ở localStorage
    const newTodo = [...todoObj, todo]
    localStorage.setItem('todos', JSON.stringify(newTodo))
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

  const startEditTodo = (id: string) => {
    console.log('id : ', id);

    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name: string) => {// nhận vào 1 todo
    setCurrentTodo((prev) => {
      if (prev) return { ...prev, name }
      return null
    })

  }

  const deleteTodo = (id: string) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    setTodos((prev) => {
      const findIndexTodo = prev.findIndex(todo => todo.id === id)
      console.log(findIndexTodo);

      if (findIndexTodo > -1) {
        const result = [...prev];
        result.splice(findIndexTodo, 1)
        return result
      }
      return prev
    })
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')// mảng được lưu ở localStorage
    const newObj = todoObj.map((todo) => todo.id === id ? null : todo)
      .filter(todo => todo != null)

    localStorage.setItem('todos', JSON.stringify(newObj));
  }

  const cloneTodo = (event: React.FormEvent<HTMLInputElement>) => {
    const todo: Todo = {
      name: '123',
      done: false,
      id: new Date().toISOString()
    }
    setTodos((pre) => {
      return [...pre, todo]
    })
  };

  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === (currentTodo as Todo).id) {
          return currentTodo as Todo
        }
        return todo
      })
    })
    setCurrentTodo(null)
    const todoString = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(todoString || '[]')// mảng được lưu ở localStorage
    const newObj = todoObj.map((todo) => {
      if (todo.id === (currentTodo as Todo).id) {
        return currentTodo as Todo
      }
      return todo
    })
    localStorage.setItem('todos', JSON.stringify(newObj))
  }
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList todos={notdoneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
        <TaskList doneTaskList todos={doneTodos} handleDoneTodo={handleDoneTodo} startEditTodo={startEditTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  )
}
