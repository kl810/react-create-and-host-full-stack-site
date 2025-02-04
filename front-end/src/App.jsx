import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './App.css'
import HomePage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import ArticlePage, { loader as articleLoader } from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import Layout from './Layout'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
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
    path: '/articles/:name',
    element: <ArticlePage />,
    loader: articleLoader,
  }, {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/create-account',
    element: <CreateAccountPage />,
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
