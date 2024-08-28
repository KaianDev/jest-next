import { render, screen } from "@testing-library/react"
import { Button } from "./button"

describe("Button component", () => {
  it("should the aria-label property is defined", () => {
    render(<Button aria-label="label">Teste</Button>)

    screen.getByLabelText("label")
  })
})
