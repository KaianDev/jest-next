import { ComponentProps } from "react"

interface ButtonProps extends ComponentProps<"button"> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={`"bg-emerald-500 h-full aspect-square items-center justify-center flex rounded-md" ${className}`}
      {...rest}>
      {children}
    </button>
  )
}
