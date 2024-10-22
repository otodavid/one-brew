import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorPage from './components/ErrorPage';
import Home from './routes/home';
import AddProduct from './routes/add-product';
import EditProduct from './routes/edit-product';
import ViewProducts from './routes/view-products';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/products/add', element: <AddProduct /> },
      { path: '/products/edit', element: <EditProduct /> },
      { path: '/products/view', element: <ViewProducts /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
