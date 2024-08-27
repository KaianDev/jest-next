import { render, screen } from "@testing-library/react"
import Home from "./page"

describe("Home page", () => {
  it("should sum correctly", () => {
    expect(1 + 1).toBe(2)
  })

  it("should have a title Home", () => {
    render(<Home />)

    const homeTitle = screen.getByText("Home")

    expect(homeTitle).toBeDefined()
  })

  it("should have a link about", () => {
    render(<Home />)

    const aboutLink = screen.getByRole("link", { name: "About" })

    expect(aboutLink).toBeDefined()
    expect(aboutLink).toHaveProperty("href", `${window.location.href}about`)
  })

  it("should have a link todos", () => {
    render(<Home />)
    const todosLink = screen.getByRole("link", { name: "Todos" })

    expect(todosLink).toBeDefined()
    expect(todosLink).toHaveProperty("href", `${window.location.href}todos`)
  })
})
