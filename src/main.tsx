import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import Layout from '@/Layout';
import ErrorPage from '@/pages/ErrorPage';
import Species from '@/pages/Species';
import './base.scss';
import SpeciesOverview from '@/pages/SpeciesOverview';
import PokemonList from '@/pages/PokemonList';
import PokemonDetail from '@/pages/PokemonDetail';

// URLrouting setting
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
