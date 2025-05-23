    import { useState } from "react";



export const SearchBar = () => {
    const [value, setValue] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    return (
        <input 
            type="text" 
            placeholder='Rechercher une playlist...'  
            onChange={onChange} 
            className="bg-neutral-1 w-full border-neutral-500 border placeholder-neutral-600 bg-neutral-500 rounded-md p-1" 
        />
    )
}