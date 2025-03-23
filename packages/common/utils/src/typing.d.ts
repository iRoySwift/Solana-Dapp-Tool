export type PathsToString<T, Prefix extends string = ""> = T extends object
  ? {
      [Key in keyof T]: T[Key] extends object
        ? PathsToString<T[Key], `${Prefix}${Key & string}.`>
        : `${Prefix}${Key & string}`;
    }[keyof T]
  : "never";
