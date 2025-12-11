import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import App from './App.jsx'
import { Home } from './components'
import './index.css'
import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
