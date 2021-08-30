export function removeElement<T>(arr: T[], index: number): T[] {
  arr.splice(index, 1);
  return arr;
}
