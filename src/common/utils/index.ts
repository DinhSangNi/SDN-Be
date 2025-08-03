export function toCamelCase(fullName: string): string {
  return fullName
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('');
}
