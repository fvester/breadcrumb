import type { RouteInfo } from '@/types/components';
import './Species.scss';
import { Link } from 'react-router-dom';
import BreadCrumb from '@/components/BreadCrumb';
import { useFetch } from '@/hooks/UseFetch';
import type { PageResponse, SpeciesMeta } from '@/types/model';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';
import { useEffect } from 'react';
// import { useFetchRecur } from '@/hooks/UseFetchRecur';

// Species List Page
const Species = () => {
  const { location, curPath, prevRouteHistory } = useGenerateHistory();
  // Test code
  // const { data, isLoading, error } = useFetchRecur('/pokemon-species');

  const { data, isLoading, error } = useFetch<SpeciesMeta>(
    '/pokemon-species',
    true,
  );

  const sigName = 'Pokemon Species List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  const speciesList = (data as PageResponse<SpeciesMeta> | null)?.results;
  //pokeapi.co/api/v2/pokemon-species/2/

  return (
    <div id="species">
      <h1>Species</h1>
      <BreadCrumb
        routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
        curPath={curPath}
      />

      <ul className="species-list">
        {isLoading ? (
          <div> loading </div>
        ) : (
          speciesList?.map((meta: SpeciesMeta) => {
            const { name, url } = meta;

            // Need optimize
            const speciesId = Number(url.split('/').reverse()[1]);

            // Validation: If not positive number
            if (isNaN(speciesId) || speciesId <= 0) {
              return null;
            } else {
              return (
                <li key={speciesId} className="species-list-item">
                  <Link
                    className="species-list-item-link"
                    to={`/species/${speciesId}`}
                    state={{
                      prevRouteHistory: [
                        ...(prevRouteHistory ?? []),
                        curRouteInfo,
                      ],
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
