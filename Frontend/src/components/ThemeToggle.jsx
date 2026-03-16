import { useThemeStore } from '../storage/themeStore'
import { Sun, Moon } from 'lucide-react' 

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button 
      onClick={toggleTheme} 
      className="btn btn-ghost btn-circle"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-neutral" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  )
}

export default ThemeToggle