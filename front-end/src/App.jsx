import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import axios from 'axios';

import './App.css'
import HomePage from './pages/Homepage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import ArticlesListPage from './pages/ArticlesListPage'
import Layout from './Layout'
import NotFoundPage from './pages/NotFoundPage'

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
    loader: async function() {
      const response = await axios.get('/api/articles/learn-node');
      const { upvotes, comments } = response.data;
      return { upvotes, comments }    //referenced with useLoaderData hook in ArticlePage.jsx
    }
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
