interface SearchBarProps {
    value: string;
    setValue: (value: string) => void;
}

export const SearchBar = ({ value, setValue }: SearchBarProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder='Rechercher une playlist...'  
                onChange={onChange}
                value={value}
                className="bg-neutral-1 w-full border-neutral-500 border placeholder-neutral-600 bg-neutral-500 rounded-md p-1" 
            />
           
        </div>
    )
}