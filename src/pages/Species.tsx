import type { PrevPageState, RouteInfo } from '@/types/components';
import './Species.scss';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '@/components/BreadCrumb';
import { useFetch } from '@/hooks/UseFetch';
import type { SpeciesMeta } from '@/types/model';
// import { useFetchRecur } from '@/hooks/UseFetchRecur';

// Species List Page
const Species = () => {
  const location = useLocation();
  const curPath = location.pathname;
  const { prevRouteHistory } = location.state as PrevPageState;

  const sigName = 'Pokemon Species List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  // Test code
  // const { data, isLoading, error } = useFetchRecur('/pokemon-species');

  const {
    data: speciesList,
    isLoading,
    error,
  } = useFetch('/pokemon-species', true);

  console.log(speciesList);
  //pokeapi.co/api/v2/pokemon-species/2/

  return (
    <div id="species">
      <h1>Species</h1>
      <BreadCrumb
        routeHistory={[...prevRouteHistory, curRouteInfo]}
        curPath={curPath}
      />

      <ul className="species-list">
        {isLoading ? (
          <div> loading </div>
        ) : (
          speciesList.map((meta: SpeciesMeta) => {
            const { name, url } = meta;

            // Need optimize
            const speciesId = Number(url.split('/').reverse()[1]);

            // Validation: If not positive number
            if (isNaN(speciesId) || speciesId <= 0) {
              return null;
            } else {
              return (
                <li className="species-list-item">
                  <Link
                    className="species-list-item-link"
                    to={`/species/${speciesId}`}
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

export default Species;
