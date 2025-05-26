import { useParams } from 'react-router-dom';
import './PokemonDetail.scss';
import type { PokemonDetailRes } from '@/types/model';
import { useFetch } from '@/hooks/UseFetch';
import type { RouteInfo } from '@/types/components';
import BreadCrumb from '@/components/BreadCrumb';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';
import { snakeToCamel } from '@/utils/string';

// Pokemon Detail page
const PokemonDetail: React.FC = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const { species: speciesId, pokemon: pokemonId } = useParams();

  // Get current page data
  const { data, isLoading, error } = useFetch<PokemonDetailRes>(
    `/pokemon/${pokemonId}`,
    false,
  );

  let baseExperience: number | null = null;

  if (data) {
    const { baseExperience: baseExperienceCopy } = snakeToCamel(data);

    baseExperience = baseExperienceCopy;
  }

  // Get data from response
  const pokemonName = data?.name;
  const height = data?.height;
  const weight = data?.weight;
  const species = data?.species;
  const sprites = data?.sprites;

  const frontImg = sprites?.front_default;

  const sigName = `${pokemonName}`;
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail-container">
        <BreadCrumb
          className="pokemon-detail"
          routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
          curPath={curPath}
        />

        <div className="pokemon-detail-left">
          <div className="pokemon-detail-left-container">
            <img className="pokemon-detail-img" src={frontImg}></img>
            <div className="pokemon-detail-name">{pokemonName}</div>
          </div>
        </div>
        <div className="pokemon-detail-right">
          <div className="pokemon-detail-right-container">
            <ul className="pokemon-detail-fields">
              <li className="pokemon-detail-info">height: {height}</li>
              <li className="pokemon-detail-info">weight: {weight}</li>
              <li className="pokemon-detail-info">species: {species?.name}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
