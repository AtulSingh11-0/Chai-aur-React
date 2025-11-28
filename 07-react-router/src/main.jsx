import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import './index.css'
import Layout from './Layout.jsx'

import {
  AboutUs, ContactUs, Home, UserDetail, userDetailLoader, Users
} from "./components/index.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='/about' element={<AboutUs />} />
      <Route path='/contact' element={<ContactUs />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/:userId' loader={userDetailLoader} element={<UserDetail />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
