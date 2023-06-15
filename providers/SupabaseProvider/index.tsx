"use client"

// hooks
import { useState } from 'react';

// auth deps
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// interfaces
import { Database } from "../../types/database/types_db"

interface SupabaseProviderProps {
    children: React.ReactNode;
}

const SupabaseProvider = ({
    children,
}: SupabaseProviderProps) => {
    const [ supabaseClient ] = useState(() => createClientComponentClient<Database>());

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
}

export default SupabaseProvider;