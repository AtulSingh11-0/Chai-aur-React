import './App.css'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './contexts/UserContextProvider'

function App() {
  return (
    // Wrap the application with UserContextProvider to provide user context
    <UserContextProvider>
      <h1>Hello welcome to context API tutorial</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
