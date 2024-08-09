export type SearchProp = {
  onSearch: (input: string) => void;
  setquery: (params: { searchInput?: string; page?: number }) => void;
};
