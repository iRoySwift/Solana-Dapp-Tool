export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>;

export type LocalesgMap = Record<string, string>;

/**
 * 返回函数promise json
 */
export type ReturnFnJsonType<T> =
  ReturnType<T[keyof T]> extends Promise<infer R> ? R : never;

type DictKey<T> =
  T extends DictionariesJsonType<T> ? T : keyof DictionariesJsonType<T>;
