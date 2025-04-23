import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import AddProject from '../pages/AddProject/AddProject';
import Showcase from '../components/Showcase/Showcase';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'admin',
        element: <AddProject />,
      },
      {
        path: ':title',
        element: <Showcase />,
      },
    ],
  },
]);

export default router;