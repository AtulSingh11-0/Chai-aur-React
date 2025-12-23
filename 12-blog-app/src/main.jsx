import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import App from './App.jsx'
import { Protected } from './components/index.js'
import './index.css'
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from './pages'
import store from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index element={<Home />} />

      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />

      <Route element={<Protected requiresAuthentication={true} />}>
        <Route path='/all-posts' element={<AllPosts />} />
        <Route path='/add-post' element={<AddPost />} />
        <Route path='/edit-post/:slug' element={<EditPost />} />
        <Route path='/post/:slug' element={<Post />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
