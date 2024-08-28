"use client"

import { FormEvent, useState } from "react"
import { v4 as uuid } from "uuid"
import { TodoItem } from "./todo-item"
import { Todo } from "../types/todo"
import { TodoForm } from "./todo-form"

export const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editInput, setEditInput] = useState<undefined | string>()

  const handleAddNewTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string

    if (!title || title.trim() === "") {
      return
    }

    setTodos((prev) => {
      const hasTodoInList = prev.some(
        (i) => i.title.toLocaleLowerCase() === title.toLocaleLowerCase()
      )

      if (hasTodoInList) {
        return prev
      }

      return [
        ...prev,
        {
          id: uuid(),
          title: formData.get("title") as string,
          done: false,
        },
      ]
    })
    setEditInput(undefined)
    e.currentTarget.reset()
  }

  const handleEditTodoSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    if (!title || title.trim() === "") return

    setTodos((prev) => {
      return prev.map((item) => {
        const hasTodoItem =
          item.title.toLocaleLowerCase() === editInput?.toLocaleLowerCase()

        if (hasTodoItem) {
          return { ...item, title }
        }
        return item
      })
    })
    setEditInput(undefined)
    e.currentTarget.reset()
  }

  const handleDeleteTodoItem = (todoId: string) => {
    setTodos((prev) => prev.filter((i) => i.id !== todoId))
  }

  const handleEditButtonClick = (title: string) => {
    setEditInput(title)
  }

  const handleToggleTodoStatus = (todoId: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId ? { ...item, done: !item.done } : item
      )
    )
  }

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-50 flex items-center flex-col p-6 gap-6">
      <h1 className="text-3xl">Minhas tarefas</h1>

      <div className="max-w-xl w-full flex items-center justify-center flex-col">
        <TodoForm
          inputDefaultValue={editInput}
          onAddTodoSubmit={handleAddNewTodoSubmit}
          onEditTodoSubmit={handleEditTodoSubmit}
        />

        {todos.length > 0 && (
          <div className="bg-zinc-800 space-y-2 mt-4 w-full max-w-xl rounded-md p-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDeleteTodo={handleDeleteTodoItem}
                onEditTodo={handleEditButtonClick}
                onToggleStatusTodo={handleToggleTodoStatus}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
