export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-screen-xl mx-auto grid gap-x-4 grid-cols-[300px_1fr]">{children}</div>
  )
}
