export default function Footer() {
  return (
    <footer className="
      h-10 px-6
      flex items-center justify-center
      border-t border-border
      bg-background
    ">
      <p className="text-xs text-muted-foreground">
        meuPonteiro — Iniciação Científica · {new Date().getFullYear()}
      </p>
    </footer>
  )
}