import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-50 flex items-center flex-col p-6">
      <h1 className="text-3xl">Home</h1>
      <div className="space-x-4 text-lg">
        <Link href="/about">About</Link>
        <Link href="/todos">Todos</Link>
      </div>
    </div>
  )
}
