export function Footer() {
  const now = new Date()

  return (
    <footer className="w-full py-4 text-center">
      <span className="font-medium text-xs text-zinc-400">
        &copy; {now.getFullYear()} Lightning. Todos os direitos reservados.
      </span>
    </footer>
  )
}
