type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
export interface HILSearchGifs {
    query: string
    setQuery: SetState<string>
    handleSearch: () => void
}