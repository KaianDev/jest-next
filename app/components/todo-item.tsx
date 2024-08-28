"use client"

import { CheckIcon, EditIcon, Loader2Icon, TrashIcon } from "lucide-react"
import type { Todo } from "../types/todo"

interface TodoItemProps {
  todo: Todo
  onEditTodo: (todoTitle: string) => void
  onDeleteTodo: (todoId: string) => void
  onToggleStatusTodo: (todoId: string) => void
}

export const TodoItem = ({
  todo,
  onEditTodo,
  onDeleteTodo,
  onToggleStatusTodo,
}: TodoItemProps) => {
  const handleToggleTodoStatus = () => {
    onToggleStatusTodo(todo.id)
  }

  const handleDeleteTodo = () => {
    onDeleteTodo(todo.id)
  }

  const handleEditTodo = () => {
    onEditTodo(todo.title)
  }

  return (
    <div className="p-2 bg-zinc-900 rounded-md gap-3 flex items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleToggleTodoStatus}
          aria-label={`Alterar status:${todo.title}`}
          className="bg-emerald-500 p-1 rounded-md flex items-center justify-center">
          {todo.done ? (
            <span aria-label={`tarefa concluída:${todo.title}`}>
              <CheckIcon size={18} className="text-zinc-50" />
            </span>
          ) : (
            <span aria-label={`tarefa em andamento:${todo.title}`}>
              <Loader2Icon
                size={18}
                strokeWidth={3}
                className="animate-spin text-zinc-50"
              />
            </span>
          )}
        </button>

        <p className={todo.done ? "line-through" : ""}>{todo.title}</p>
      </div>

      <div className="space-x-3">
        <button
          onClick={handleEditTodo}
          type="button"
          aria-label={`Editar tarefa:${todo.title}`}>
          <EditIcon size={18} />
        </button>
        <button
          onClick={handleDeleteTodo}
          type="button"
          aria-label={`Apagar tarefa:${todo.title}`}>
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  )
}
