import { PlusIcon, SaveIcon } from "lucide-react"
import { Button } from "./button"
import { FormEvent } from "react"

interface TodoFormProps {
  inputDefaultValue: string | undefined
  onAddTodoSubmit: (e: FormEvent<HTMLFormElement>) => void
  onEditTodoSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export const TodoForm = ({
  inputDefaultValue,
  onAddTodoSubmit,
  onEditTodoSubmit,
}: TodoFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    return inputDefaultValue ? onEditTodoSubmit(e) : onAddTodoSubmit(e)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-3 w-full">
      <input
        type="text"
        name="title"
        defaultValue={inputDefaultValue}
        placeholder="Digite o título da tarefa"
        className="p-3 bg-zinc-900 rounded-md w-full "
      />
      {inputDefaultValue ? (
        <Button type="submit" aria-label="Salvar alteração">
          <SaveIcon size={24} />
        </Button>
      ) : (
        <Button type="submit" aria-label="Adicionar tarefa">
          <PlusIcon size={24} />
        </Button>
      )}
    </form>
  )
}
