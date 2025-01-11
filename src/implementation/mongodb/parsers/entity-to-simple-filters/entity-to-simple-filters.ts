import { ObjectId } from 'mongodb';

const ingestObject = (
  prefix: string,
  object: Object,
): Record<string, unknown> =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (value == null) return acc;

    if (typeof value === 'object')
      return {
        ...acc,
        ...ingestObject(`${prefix}.${key}`, value),
      };

    return {
      ...acc,
      [`${prefix}.${key}`]: value,
    };
  }, {});

export function entityToSimpleFilters(
  entity: unknown,
): Record<string, unknown> {
  if (entity == null || typeof entity !== 'object') {
    return {};
  }

  return Object.entries(entity).reduce((acc, [key, value]) => {
    if (value == null) return acc;

    if (key === 'id')
      return {
        ...acc,
        _id: ObjectId.createFromHexString(value),
      };
    else if (typeof value === 'object')
      return {
        ...acc,
        ...ingestObject(key, value),
      };

    return {
      ...acc,
      [key]: value,
    };
  }, {});
}
