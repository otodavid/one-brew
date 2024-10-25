import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import ErrorPage from './components/ErrorPage';
import AddProduct from './routes/add-product';
import EditProduct from './routes/edit-product';
import ViewProducts from './routes/view-products';
import Overview from './routes/overview';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/overview', element: <Overview /> },
      { path: '/products/add', element: <AddProduct /> },
      { path: '/products/edit', element: <EditProduct /> },
      { path: '/products/view', element: <ViewProducts /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
