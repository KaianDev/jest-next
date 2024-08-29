import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Todos } from "./todos"

describe("Todos Component", () => {
  const setup = () => {
    const utils = render(<Todos />)
    const input = screen.getByPlaceholderText(/Digite o título da tarefa/i)
    const addButton = screen.getByLabelText(/Adicionar tarefa/i)

    return {
      input,
      addButton,
      ...utils,
    }
  }

  it("should have a title 'Minhas tarefas'", () => {
    const { getByText } = render(<Todos />)
    const title = "Minhas tarefas"
    expect(getByText(title)).toBeInTheDocument()
  })

  it("should have a input to add new Todo", () => {
    const { input } = setup()
    expect(input).toBeDefined()
  })

  it("should have a button to add new Todo", () => {
    const { addButton } = setup()
    expect(addButton).toBeInTheDocument()
  })

  it("should add new task", async () => {
    const { input, addButton, getAllByText } = setup()
    const todoItemTitle = "Nova tarefa"

    await userEvent.type(input, todoItemTitle)
    await userEvent.click(addButton)

    const todoItems = getAllByText(todoItemTitle)

    expect(todoItems[0]).toBeInTheDocument()
    expect((input as HTMLInputElement).value).toBe("")
  })

  it("should not add two todo same title", async () => {
    const { input, addButton, getAllByText } = setup()
    const todoItemTitle = "Nova tarefa"

    await userEvent.type(input, todoItemTitle)
    await userEvent.click(addButton)

    await userEvent.clear(input)

    await userEvent.type(input, todoItemTitle)
    await userEvent.click(addButton)

    const todoItems = getAllByText(todoItemTitle)

    expect(todoItems[0]).toBeInTheDocument()
    expect(todoItems.length).not.toBeGreaterThan(1)
    expect((input as HTMLInputElement).value).toBe("")
  })

  it("should delete a todo item", async () => {
    const { input, addButton, getByLabelText, queryAllByText } = setup()

    const todoItemTitle = "Nova tarefa 123"

    await userEvent.type(input, todoItemTitle)

    await userEvent.click(addButton)

    const deleteButton = getByLabelText(`Apagar tarefa:${todoItemTitle}`)
    await userEvent.click(deleteButton)

    const todoItems = queryAllByText(todoItemTitle)

    expect(deleteButton).toHaveProperty("type", "button")
    expect(todoItems.length).not.toBeGreaterThan(0)
  })

  it("should edit todo item", async () => {
    const {
      input,
      addButton,
      getByLabelText,
      getByDisplayValue,
      getByText,
      queryByText,
    } = setup()

    const todoTitle = "Nova tarefa"
    const newTodoTitle = "Tarefa editada"

    await userEvent.type(input, todoTitle)
    await userEvent.click(addButton)

    const editButton = getByLabelText(`Editar tarefa:${todoTitle}`)
    await userEvent.click(editButton)

    const editInput = getByDisplayValue(todoTitle)

    await userEvent.type(editInput, newTodoTitle, {
      initialSelectionStart: 0,
      initialSelectionEnd: newTodoTitle.length,
    })

    const saveButton = getByLabelText("Salvar alteração")
    await userEvent.click(saveButton)

    const newTodoItem = getByText(newTodoTitle)
    const oldTodoItem = queryByText(todoTitle)

    expect(newTodoItem).toBeInTheDocument()
    expect(oldTodoItem).not.toBeInTheDocument()
  })

  it("should change status of todo item to done", async () => {
    const { input, addButton, getByLabelText, getByText, queryByLabelText } =
      setup()

    const todoTitle = "Nova tarefa"
    await userEvent.type(input, todoTitle)
    await userEvent.click(addButton)

    const statusButton = getByLabelText(`Alterar status:${todoTitle}`)

    await userEvent.click(statusButton)

    const todoItemDone = getByLabelText(`tarefa concluída:${todoTitle}`)
    const todoItemIsPending = queryByLabelText(
      `tarefa em andamento:${todoTitle}`
    )

    expect(getByText(todoTitle)).toHaveClass("line-through")
    expect(todoItemDone).toBeInTheDocument()
    expect(todoItemIsPending).not.toBeInTheDocument()
  })

  it("should return pending status when there are two clicks on the change status button", async () => {
    const { input, addButton, getByLabelText, queryByLabelText } = setup()

    const todoTitle = "Nova tarefa"

    await userEvent.type(input, todoTitle)

    await userEvent.click(addButton)

    const statusButton = getByLabelText(`Alterar status:${todoTitle}`)

    await userEvent.dblClick(statusButton)

    const todoItemDone = queryByLabelText(`tarefa concluída:${todoTitle}`)
    const todoItemIsPending = queryByLabelText(
      `tarefa em andamento:${todoTitle}`
    )

    expect(todoItemDone).not.toBeInTheDocument()
    expect(todoItemIsPending).toBeInTheDocument()
  })
})
