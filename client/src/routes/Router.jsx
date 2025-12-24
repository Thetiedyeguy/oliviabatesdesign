import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import Contact from '../pages/Contact/Contact';
import AddProject from '../pages/AddProject/AddProject';
import BioBubbles from '../pages/ShowcasePages/BioBubbles';
import StudyLamp from '../pages/ShowcasePages/StudyLamp';
import IcyLattice from '../pages/ShowcasePages/IcyLattice';
import About from '../pages/About/About';
import ISAM from '../pages/ISAM/ISAM';

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
        path: 'about',
        element: <About/>
      },
      {
        path: 'admin',
        element: <AddProject />,
      },
      {
        path: 'BioBubbles',
        element: <BioBubbles />,
      },
      {
        path: 'Study Lamp',
        element: <StudyLamp />,
      },
      {
        path: 'Icy Lattice',
        element: <IcyLattice />,
      },
      {
        path: 'ISAM',
        element: <ISAM />,
      },
    ],
  },
]);

export default router;