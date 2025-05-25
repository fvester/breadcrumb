import _ from 'lodash';

interface ObjectLiteral {
  [key: string]: any;
}

export function snakeToCamel(input: ObjectLiteral): ObjectLiteral {
  if (_.isArray(input)) {
    return input.map((v) => snakeToCamel(v));
  }
  if (_.isObject(input)) {
    return _.mapValues(
      _.mapKeys(input, (v, k) => _.camelCase(k)),
      (v) => snakeToCamel(v),
    );
  }
  return input;
}
