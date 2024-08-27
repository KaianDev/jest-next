import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Todos } from "./todos"

describe("Todos Component", () => {
  it("should have a title 'Minhas tarefas'", () => {
    render(<Todos />)

    const title = "Minhas tarefas"
    const todosTitle = screen.getAllByText(title)

    expect(todosTitle).toBeDefined()
  })

  it("should have a input to add new Todo", () => {
    render(<Todos />)

    const input = screen.getByPlaceholderText("Digite o título da tarefa")

    expect(input).toBeDefined()
  })

  it("should have a button to add new Todo", () => {
    render(<Todos />)
    const button = screen.getByLabelText("Adicionar tarefa")

    expect(button).toBeDefined()
  })

  it("should add new task", async () => {
    render(<Todos />)

    const todoItemTitle = "Nova tarefa"

    const input = screen.getByPlaceholderText(
      "Digite o título da tarefa"
    ) as HTMLInputElement
    const addButton = screen.getByLabelText("Adicionar tarefa")

    await userEvent.type(input, todoItemTitle)
    await userEvent.click(addButton)

    await userEvent.clear(input)

    await userEvent.type(input, todoItemTitle)
    await userEvent.click(addButton)

    const todoItems = screen.getAllByText(todoItemTitle)

    expect(todoItems[0]).toBeDefined()
    expect(todoItems.length).not.toBeGreaterThan(1)
    expect(input.value).toBe("")
  })

  it("should delete a todo item", async () => {
    render(<Todos />)

    const todoItemTitle = "Nova tarefa 123"

    const input = screen.getByPlaceholderText("Digite o título da tarefa")

    await userEvent.type(input, todoItemTitle)

    const addButton = screen.getByLabelText("Adicionar tarefa")

    await userEvent.click(addButton)

    const deleteButton = screen.getByLabelText(`Apagar tarefa:${todoItemTitle}`)
    await userEvent.click(deleteButton)

    const todoItems = screen.queryAllByText(todoItemTitle)

    expect(deleteButton).toHaveProperty("type", "button")
    expect(todoItems.length).not.toBeGreaterThan(0)
  })

  it("should can be edit todo item", async () => {
    render(<Todos />)

    const todoTitle = "Nova tarefa"
    const newTodoTitle = "Tarefa editada"
    const input = screen.getByPlaceholderText("Digite o título da tarefa")
    const addButton = screen.getByLabelText("Adicionar tarefa")

    await userEvent.type(input, todoTitle)
    await userEvent.click(addButton)

    const editButton = screen.getByLabelText(`Editar tarefa:${todoTitle}`)
    await userEvent.click(editButton)

    const editInput = screen.getByDisplayValue(todoTitle)
    await userEvent.type(editInput, newTodoTitle, {
      initialSelectionStart: 0,
      initialSelectionEnd: newTodoTitle.length,
    })

    const saveButton = screen.getByLabelText("Salvar alteração")
    await userEvent.click(saveButton)

    const newTodoItem = screen.getByText(newTodoTitle)

    expect(newTodoItem).toBeDefined()
  })
})
