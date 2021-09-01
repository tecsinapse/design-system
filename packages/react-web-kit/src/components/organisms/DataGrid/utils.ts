export function removeElement<T>(arr: T[], index: number): T[] {
  const data = arr; // Sometimes looks like the data is removed from table, check if this is a bug. I'm copying the arr to a new variable for security reasons
  data.splice(index, 1);
  return data;
}

export const getData = <Data>(
  data: Data[],
  rowsCount: number | undefined,
  page: number,
  rowsPerPage: number
): Data[] =>
  rowsCount
    ? data
    : data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
