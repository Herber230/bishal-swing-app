export interface Handler<T = unknown> {
  tag: string;
  // TODO: Fix false positive
  // eslint-disable-next-line no-unused-vars
  action: (e: T) => void;
}

export interface CustomCatchTagOptions {
  pathsToInspect: string[];
}
