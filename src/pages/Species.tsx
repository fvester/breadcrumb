import type { RouteInfo } from '@/types/components';
import './Species.scss';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '@/components/BreadCrumb';
import { useFetch } from '@/hooks/UseFetch';
import type { PageResponse, SpeciesMeta } from '@/types/model';
import { useGenerateHistory } from '@/hooks/UseGenerateHistory';
import Loader from '@/components/common/Loader';
// import { useFetchRecur } from '@/hooks/UseFetchRecur';

// Species List Page
const Species: React.FC = () => {
  const { curPath, prevRouteHistory } = useGenerateHistory();
  const navigage = useNavigate();

  const { data, isLoading } = useFetch<SpeciesMeta>('/pokemon-species', true);

  const listItemClick = (e: React.MouseEvent, speciesId: number) => {
    navigage(`/species/${speciesId}`, {
      state: {
        prevRouteHistory: [...(prevRouteHistory ?? []), curRouteInfo],
      },
    });
  };

  const sigName = 'Pokemon Species List';
  const curRouteInfo: RouteInfo = { sigName: sigName, path: curPath };

  const speciesList = (data as PageResponse<SpeciesMeta> | null)?.results;

  const sectionObj: Record<string, SpeciesMeta[]> = {};

  // Sort name
  speciesList?.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1,
  );

  let setList = null;

  // Ascii code a~z
  // Divide section
  if (speciesList) {
    for (let i = 97; i < 123; i++) {
      const sectionList = speciesList.filter(
        (v) => v.name.toLowerCase().charAt(0) === String.fromCharCode(i),
      );

      sectionObj[String.fromCharCode(i)] = sectionList;
    }

    const sectionArr = [];
    // Make setList var
    for (const alphabet in sectionObj) {
      const sectionComp = (
        <ul key={alphabet}>
          <div className="species-list-header">
            <div>{alphabet.toUpperCase()}</div>
          </div>
          {sectionObj[alphabet].map((meta: SpeciesMeta) => {
            const { name, url } = meta;

            // Need optimize
            const speciesId = Number(url.split('/').reverse()[1]);

            // Validation: If not positive number
            if (isNaN(speciesId) || speciesId <= 0) {
              return null;
            } else {
              return (
                <li
                  key={speciesId}
                  className="species-list-item"
                  onClick={(e: React.MouseEvent) => listItemClick(e, speciesId)}
                >
                  <div>{name}</div>
                </li>
              );
            }
          })}
        </ul>
      );

      sectionArr.push(sectionComp);
    }

    setList = (
      <div className="species-list-content">{sectionArr.map((v) => v)}</div>
    );
  }

  return (
    <div className="species">
      <div className="species-container">
        <BreadCrumb
          className="species"
          routeHistory={[...(prevRouteHistory ?? []), curRouteInfo]}
          curPath={curPath}
        />

        <div className="species-list-container">
          <ul className="species-list">
            <div className="species-list-title">
              <div>Pokemon Species</div>
            </div>

            {isLoading ? <Loader /> : setList}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Species;
