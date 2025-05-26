import { Link, useNavigate, useParams } from 'react-router-dom';
import './PokemonList.scss';
import type { RouteInfo } from '@/types/components';
import type { PokemonMeta, SpeciesOverviewRes } from '@/types/model';
import { useFetch } from '@/hooks/UseFetch';
import { snakeToCamel } from '@/utils/string';
import BreadCrumb from '@/components/BreadCrumb';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';

// Pokemon List Page
const PokemonList: React.FC = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const navigage = useNavigate();

  const { species: speciesId } = useParams();

  const { data, isLoading, error } = useFetch<SpeciesOverviewRes>(
    `/pokemon-species/${speciesId}`,
    false,
  );

  const varietiesItemClick = (
    e: React.MouseEvent,
    speciesId: string,
    pokemonId: number,
  ) => {
    navigage(`/species/${speciesId}/pokemons/${pokemonId}`, {
      state: {
        prevRouteHistory: [...(prevRouteHistory ?? []), curRouteInfo],
      },
    });
  };

  const sigName = 'Pokemon List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  const varieties: PokemonMeta[] | null = data?.varieties;

  return (
    <div className="pokemon-list">
      <div className="pokemon-list-container">
        <h1>Pokemon List</h1>
        <BreadCrumb
          className="pokemon-list"
          routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
          curPath={curPath}
        />

        <div className="pokemon-list-varieties-container">
          <ul className="pokemon-list-varieties">
            <div className="pokemon-list-varieties-title">
              <div>Pokemon varieties</div>
            </div>
            {isLoading ? (
              <div> loading </div>
            ) : (
              varieties?.map((meta: PokemonMeta) => {
                let isDefault: boolean | null = null;
                let pokemon: { name: string; url: string } | null = null;

                const { isDefault: isDefaultCopy, pokemon: pokemonCopy } =
                  snakeToCamel(meta);
                isDefault = isDefaultCopy;
                pokemon = pokemonCopy;

                if (pokemon == null) return null;

                const { url, name } = pokemon;

                // Need optimize
                const pokemonId = Number(url.split('/').reverse()[1]);

                // Validation: If not positive number
                if (isNaN(pokemonId) || pokemonId <= 0) {
                  return null;
                } else {
                  return (
                    <li
                      key={pokemonId}
                      className="pokemon-list-varieties-item"
                      onClick={(e: React.MouseEvent) =>
                        varietiesItemClick(
                          e,
                          speciesId ? speciesId : '',
                          pokemonId,
                        )
                      }
                    >
                      <div>{name}</div>
                    </li>
                  );
                }
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
