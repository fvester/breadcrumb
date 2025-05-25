import { Link, useLocation, useParams } from 'react-router-dom';
import './PokemonList.scss';
import type { PrevPageState, RouteInfo } from '@/types/components';
import type { PokemonMeta, SpeciesOverviewRes } from '@/types/model';
import { useFetch } from '@/hooks/UseFetch';
import { snakeToCamel } from '@/utils/string';
import BreadCrumb from '@/components/BreadCrumb';

// Pokemon List Page
const PokemonList = () => {
  const location = useLocation();
  const { species: speciesId } = useParams();
  const curPath: string = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const sigName = 'Pokemon List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  const { data, isLoading, error } = useFetch<SpeciesOverviewRes>(
    `/pokemon-species/${speciesId}`,
    false,
  );

  const varieties: PokemonMeta[] | null = data?.varieties;

  return (
    <div id="pokemon-list">
      <h1>Pokemon List</h1>
      <BreadCrumb
        routeHistory={[...prevRouteHistory, curRouteInfo]}
        curPath={curPath}
      />

      <ul className="pokemon-list-varieties">
        {isLoading ? (
          <div> loading </div>
        ) : (
          varieties?.map((meta: PokemonMeta) => {
            let isDefault: boolean | null = null;
            let pokemon: { name: string; url: string } | null = null;

            try {
              const { isDefault: isDefaultCopy, pokemon: pokemonCopy } =
                snakeToCamel(meta);
              isDefault = isDefaultCopy;
              pokemon = pokemonCopy;
            } catch (error) {
              return null;
            }

            if (pokemon == null) return null;

            const { url, name } = pokemon;

            // Need optimize
            const pokemonId = Number(url.split('/').reverse()[1]);

            // Validation: If not positive number
            if (isNaN(pokemonId) || pokemonId <= 0) {
              return null;
            } else {
              return (
                <li key={pokemonId} className="pokemon-list-varieties-item">
                  <Link
                    className="pokemon-list-varieties-item-link"
                    to={`/species/${speciesId}/pokemons/${pokemonId}`}
                    state={{
                      prevRouteHistory: [...prevRouteHistory, curRouteInfo],
                    }}
                  >
                    {name}
                  </Link>
                </li>
              );
            }
          })
        )}
      </ul>
    </div>
  );
};

export default PokemonList;
