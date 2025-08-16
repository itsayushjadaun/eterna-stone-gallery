
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export const ThemeToggle = ({ isScrolled = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  const getIconColor = () => {
    if (isScrolled) {
      return theme === 'light' ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80';
    }
    return 'text-white hover:text-white/80';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={`w-9 h-9 p-0 ${getIconColor()} hover:bg-white/10`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
