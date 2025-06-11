
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export const ThemeToggle = ({ isScrolled = false }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 p-0 transition-colors border shadow-lg",
        isScrolled 
          ? "hover:bg-accent text-foreground border-border" 
          : "hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
      )}
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
