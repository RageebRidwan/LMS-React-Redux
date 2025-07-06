import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
    >
      {currentTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
