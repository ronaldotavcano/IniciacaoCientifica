import { createContext, useContext, useEffect, useState } from "react"
 
type Theme = "light" | "dark"
 
interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}
 
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
 
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    
    const stored = localStorage.getItem("meuponteiro-theme")
    if (stored === "dark" || stored === "light") return stored
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  })
 
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    localStorage.setItem("meuponteiro-theme", theme)
  }, [theme])
 
  const toggleTheme = () =>
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
 
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
 
export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme deve ser usado dentro de ThemeProvider")
  return ctx
}