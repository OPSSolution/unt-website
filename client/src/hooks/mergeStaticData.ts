export function mergeStaticData<T>(databaseItems: T[], staticItems: T[], identity: (item: T) => string): T[] {
  const seen = new Set(databaseItems.map((item) => identity(item).trim().toLocaleLowerCase()));
  return [
    ...databaseItems,
    ...staticItems.filter((item) => !seen.has(identity(item).trim().toLocaleLowerCase())),
  ];
}
