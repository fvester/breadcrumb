import './base.scss';
import './global.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from '@/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Home from '@/pages/Home';
import PokemonDetail from '@/pages/PokemonDetail';
import PokemonList from '@/pages/PokemonList';
import Species from '@/pages/Species';
import SpeciesOverview from '@/pages/SpeciesOverview';
import ScrollToTop from './components/ScrollToTop';

// URLrouting setting
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // For header, footer
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/species',
        element: <Species />,
      },
      {
        path: '/species/:species',
        element: <SpeciesOverview />,
      },
      {
        path: '/species/:species/pokemons',
        element: <PokemonList />,
      },
      {
        path: '/species/:species/pokemons/:pokemon',
        element: <PokemonDetail />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
