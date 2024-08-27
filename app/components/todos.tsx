"use client"

import { FormEvent, useState } from "react"
import { EditIcon, PlusIcon, SaveIcon, TrashIcon } from "lucide-react"
import { v4 as uuid } from "uuid"

interface TodoItem {
  id: string
  title: string
  done: boolean
}

export const Todos = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
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

  const handleDeleteTodoItem = (id: string) => {
    setTodos((prev) => prev.filter((i) => i.id !== id))
  }

  const handleEditButtonClick = (title: string) => {
    setEditInput(title)
  }

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-50 flex items-center flex-col p-6 gap-6">
      <h1 className="text-3xl">Minhas tarefas</h1>

      <div className="max-w-xl w-full flex items-center justify-center flex-col">
        {editInput && (
          <form
            onSubmit={handleEditTodoSubmit}
            className="flex items-center justify-center gap-3 w-full">
            <input
              type="text"
              name="title"
              defaultValue={editInput}
              placeholder="Digite o título da tarefa"
              className="p-3 bg-zinc-900 rounded-md w-full "
            />
            <button
              type="submit"
              aria-label="Salvar alteração"
              className="bg-purple-700 h-full aspect-square items-center justify-center flex rounded-md">
              <SaveIcon size={24} />
            </button>
          </form>
        )}

        {!editInput && (
          <form
            onSubmit={handleAddNewTodoSubmit}
            className="flex items-center justify-center gap-3 w-full">
            <input
              type="text"
              name="title"
              placeholder="Digite o título da tarefa"
              className="p-3 bg-zinc-900 rounded-md w-full "
            />

            <button
              type="submit"
              aria-label="Adicionar tarefa"
              className="bg-purple-700 h-full aspect-square items-center justify-center flex rounded-md">
              <PlusIcon size={24} />
            </button>
          </form>
        )}

        {todos.length > 0 && (
          <div className="bg-zinc-800 space-y-2 mt-4 w-full max-w-xl rounded-md p-3">
            {todos.map((item) => (
              <div
                key={item.id}
                className="p-2 bg-zinc-900 rounded-md gap-3 flex items-center justify-between">
                <p className="">{item.title}</p>

                <div className="space-x-3">
                  <button
                    onClick={() => handleEditButtonClick(item.title)}
                    type="button"
                    aria-label={`Editar tarefa:${item.title}`}>
                    <EditIcon size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteTodoItem(item.id)}
                    type="button"
                    aria-label={`Apagar tarefa:${item.title}`}>
                    <TrashIcon size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
