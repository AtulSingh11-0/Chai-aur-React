# 01 starting-with-react

- setup 2 folders with create-react-app and vite+react
- learnt about the differences between the two
- got a basic understanding of how to use vite and create-react-app
- understood the naming conventions of the two and how to create elements in both
- understood Reacts virtual DOM and how it works
- learnt about react-scripts

# custom-react

- created a baisc custom react library from scratch
- learnt about the basics of react from it
- understood how react works under the hood
- learnt how reconciliation and diffing algorithm works in react
- understood how react converts jsx to react elements and how it renders them

# 02 hooks-in-react

- learnt about the basics of hooks in react
- implemented useState in react and understood how it works
- did an assignment on useState and added limit to the counter

# 03 tailwind-props

- learnt about tailwind css and how to use it in react
- understood the basics of tailwind css
- implemented tailwind css in a react project
- learnt about props in react and how to use them
- implemented props in a react project

# 04 bg-color-change

- learnt about state management more properly
- used onClick event to change the background color of the page
- learnt about implementing inline styles in react with hover effect
- learnt about passing arguments to event handlers in react
- learnt about passing functions as props in react
- learnt about rendering multiple components in react using map function

# 05 password-generator

- created a password generator app in react
- learnt about different hooks in react like useState, useEffect and useRef
- implemented different features in the password generator app like copying to clipboard, generating password based on user preferences etc.
- understood how to manage state in a more complex application
- learnt about controlled components in react
- understood how to optimize functions in react using useCallback hook

# 06 currency-converter

- created a currency converter app in react
- learnt about fetching data from an API in react using fetch
- implemented currency conversion based on real-time exchange rates
- created a custom hook for fetching data from the API
- understood how to manage state in a more complex application with multiple components
- learnt about useEffect hook in more detail and how to use it for side effects like data fetching
- implemented error handling and loading states in the currency converter app
- learnt about creating reusable components in react and passing props to them
- understood the importance of component structure and organization in a react application

# 07 react-router

- created a react application with routing using react-router
- learnt about different types of routing in react-router like BrowserRouter
- implemented nested routing using Declarative Routing approach
- created different components for different routes like Home, AboutUs, ContactUs, Users, UserDetail etc.
- understood how to use Link component for navigation between routes
- learnt about route parameters and how to use them to fetch data for specific users
- implemented data fetching for user details based on route parameters
- understood how to use loaders in react-router for data fetching before rendering a route
- learnt about error handling in react-router and how to display error messages for invalid routes or data
- created an index file to export all components for easier imports
- understood the importance of organizing components and routes in a react application

# 08 mini-context

- created a mini context API in react to manage global state
- learnt about context API in react and how to use it for state management
- implemented a UserContext to manage user authentication state
- understood how to use Context.Provider to provide context values to child components
- learnt about useContext hook to consume context values in functional components
- it helped me understand the concept of prop drilling and how context API can help avoid it
- it was pretty hard to implement at first but with practice I was able to understand it better, still need more practice to master it and use it effectively in larger applications

# 09 theme-switcher

- created a theme switcher app in react using context API
- implemented light and dark themes using context API
- used a different approach than mini-context by adding all the context logic in a same file with(ThemeContext, ThemeProvider, useTheme)
- projects in companies generally follow this approach to avoid creating multiple files for each context
- created a toggle button to switch between light and dark themes
- wrote 2 different logic to switch themes, one using conditional rendering and other by toggling class names

# 10 todo-context-api

- created a todo app in react using context API for state management
- implemented adding, updating, deleting and toggling todo items
- used the same approach as theme-switcher by adding all the context logic in a same file with(TodoContext, TodoProvider, useTodo)
- created reusable components for TodoItem and TodoForm
- styled the app using tailwind css with some advanced animations and effects
- learnt about organizing components and contexts in a react application for better maintainability
- it really helped me improve my understanding of context API from previous mini-context project and how to use it effectively in a larger application
- overall it was a great learning experience but still need more practice to master context API and use it in real-world applications
