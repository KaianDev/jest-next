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

    expect(todoItems).toBeDefined()
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
})
