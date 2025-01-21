import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import './App.css'
import HomePage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import Layout from './Layout'

const routes = [{
  path: '/',
  element: <Layout />,
  children : [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element : <AboutPage />
  }, {
    path: '/articles',
    element: <ArticlesListPage />
  }, {
    path: '/articles/individual',
    element: <ArticlePage />
  }]
}]



const router = createBrowserRouter(routes)

function App() {
  return (
    //<NavBar /> here to show NavBar regardless of which page is selected 
    // will NOT WORK outside of RouterProvider. Have to use Layout and outlet
    <RouterProvider router={router} />
      
  )
}

export default App
