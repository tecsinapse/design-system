export interface TableProps {
  headers: string[];
  data: any;
  renderItem: (args: any) => any;
}
