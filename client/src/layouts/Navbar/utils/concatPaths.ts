export function concatPaths(parentPath: string, childPath: string) {
  if (!parentPath) {
    return childPath;
  }

  return `${parentPath}/${childPath}`;
}
