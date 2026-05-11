import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "../context/ThemeProvider"
 
export default function Header() {
  const { theme, toggleTheme } = useTheme()
 
  return (
    <header className="
      sticky top-0 z-50
      flex items-center justify-between
      h-14 px-6
      bg-background border-b border-border
    ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="
          w-7 h-7 rounded-md
          bg-primary
          flex items-center justify-center
          text-primary-foreground text-sm font-bold
          select-none
        ">
          P
        </div>
        <span className="font-semibold text-base tracking-tight">
          meu<span className="text-primary">Ponteiro</span>
        </span>
      </div>
 
      {/* Nav links + toggle */}
      <nav className="flex items-center gap-1">
        <Button variant="ghost" size="sm" asChild>
          <a href="/sobre">Sobre</a>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href="/docs">Documentação</a>
        </Button>
 
        {/* Divisor visual */}
        <div className="w-px h-5 bg-border mx-2" />
 
        {/* Toggle dark mode */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </nav>
    </header>
  )
}