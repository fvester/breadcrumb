import { useLocation, useParams } from 'react-router-dom';
import './PokemonDetail.scss';
import type { PokemonDetailRes } from '@/types/model';
import { useFetch } from '@/hooks/UseFetch';
import type { PrevPageState, RouteInfo } from '@/types/components';
import BreadCrumb from '@/components/BreadCrumb';

// Pokemon Detail page
const PokemonDetail = () => {
  const location = useLocation();
  const { species: speciesId, pokemon: pokemonId } = useParams();
  const curPath: string = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const { data, isLoading, error } = useFetch<PokemonDetailRes>(
    `/pokemon/${pokemonId}`,
    false,
  );

  // Get data from response
  const pokemonName = data?.name;

  const sigName = `${pokemonName}`;
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div id="pokemon-detail">
      <h1>Pokemon Detail</h1>
      <BreadCrumb
        routeHistory={[...prevRouteHistory, curRouteInfo]}
        curPath={curPath}
      />

      <h2>{`name: ${pokemonName}`}</h2>
    </div>
  );
};

export default PokemonDetail;
