import { useParams } from 'react-router-dom';
import './PokemonDetail.scss';
import type { PokemonDetailRes } from '@/types/model';
import { useFetch } from '@/hooks/UseFetch';
import type { RouteInfo } from '@/types/components';
import BreadCrumb from '@/components/BreadCrumb';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';

// Pokemon Detail page
const PokemonDetail: React.FC = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const { species: speciesId, pokemon: pokemonId } = useParams();

  // Get current page data
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
        routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
        curPath={curPath}
      />

      <h2>{`name: ${pokemonName}`}</h2>
    </div>
  );
};

export default PokemonDetail;
