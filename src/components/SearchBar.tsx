interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<SearchBarProps>) => void ;
}

export const SearchBar = ({value, onChange}: SearchBarProps) => {
    return (
        <input type="text" placeholder='Rechercher une playlist...' value={value} onChange={onchange} className=" bg-neutral-1 w-full border-neutral-500 border placeholder-neutral-600  bg-neutral-500 rounded-md p-1" />
    )
}