import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debounceValue;
};


export const API_KEY = "b5abe711";
export const API_HEADER = 'https://www.omdbapi.com/'