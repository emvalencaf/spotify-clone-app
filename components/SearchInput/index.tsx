"use client";

// hooks
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import qs from 'query-string';

// custom hooks
import { useDebounce } from "../../hooks";
import CustomInput from "../CustomInput";

const SearchInput = () => {
    // navigator
    const router = useRouter();
    
    // search values states
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query,
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <CustomInput
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default SearchInput;