# Dark Mode Implementation

This application includes a fully functional dark mode toggle that persists user preferences. Here's how it works:

## Features

- **System Preference Detection**: Automatically detects and applies the user's system preference for dark/light mode on first visit
- **User Preference**: Allows users to manually toggle between dark and light modes
- **Persistence**: Saves user preference to localStorage for subsequent visits
- **Flash Prevention**: Uses a script that applies the correct theme before the React application loads to prevent flash of wrong theme

## How It's Implemented

1. **Theme Provider**: A React context provider that manages the theme state and provides it to all components
2. **Early Theme Application**: A script that runs before the React app loads to apply the correct theme class
3. **Tailwind Integration**: Uses Tailwind's dark mode class strategy

## Components

- `ThemeProvider`: Context provider that exposes theme state and toggle function
- `theme-script.ts`: Script that runs on page load to apply the initial theme
- `useTheme()`: Custom hook to access the theme context

## Usage

The theme toggle buttons in the Navbar component use this implementation. You can access the theme context in any component:

```tsx
import { useTheme } from '@/providers/ThemeProvider';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
``` 