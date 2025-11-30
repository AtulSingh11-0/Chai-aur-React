import React, { useEffect, useState } from 'react'
import { ThemeContextProvider } from './contexts/theme'
import ThemeButton from './components/ThemeButton'
import Card from './components/Card'

function App() {
  // State to hold the current theme
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    // Logic to toggle theme between 'light' and 'dark'
    setTheme((prevTheme) => (
      prevTheme === 'light' ? 'dark' : 'light'
    ));
  }

  useEffect(() => {
    // Apply the theme class to the HTML element
    // document.querySelector('html').classList.toggle('dark', theme === 'dark');
    // or
    const htmlElement = document.querySelector('html');
    htmlElement.classList.add('dark:bg-gray-950');
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
    }
  }, [theme])

  return (
    <ThemeContextProvider value={{ theme, toggleTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            {/* ThemeButton component */}
            <ThemeButton />
          </div>

          <div className="w-full max-w-sm mx-auto">
            {/* Card component */}
            <Card />
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  )
}

export default App
