// There are no many types, Use just one file for components types

export interface RouteInfo {
  sigName: string;
  path: string;
}

export interface PrevPageState {
  prevRouteHistory: RouteInfo[];
}
