import { Handler, CustomCatchTagOptions } from './custom-catch-tag.types';

function asObjectWithTag(e: unknown): { _tag: string } | undefined {
  if (e != null && typeof e === 'object' && '_tag' in e) {
    return e as { _tag: string };
  }
}

const defaultPathsToInspect = ['cause', 'error', 'e'];

export function customCatchTag(
  e: unknown,
  handlers: Array<Handler>,
  options?: CustomCatchTagOptions,
): void {
  const pathsToInspect = [
    ...defaultPathsToInspect,
    ...(options?.pathsToInspect ?? []),
  ];

  let objectWithTag = asObjectWithTag(e);
  if (!objectWithTag)
    for (const path of pathsToInspect) {
      objectWithTag = asObjectWithTag((e as any)[path]);
      if (objectWithTag) {
        break;
      }
    }

  console.log('[>>>>>>] objectWithTag', JSON.stringify(e));

  if (objectWithTag) {
    const handler = handlers.find(h => h.tag === objectWithTag._tag);
    const defaultHandler = handlers.find(h => h.tag === 'default');
    if (handler) {
      handler.action(e);
    } else if (defaultHandler) {
      defaultHandler.action(e);
      throw new Error('Unhandled error');
    }
  }
}
