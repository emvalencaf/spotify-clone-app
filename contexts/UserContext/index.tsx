// react deps
import { createContext } from "react";

// interfaces
import { Subscription } from "../../types/subscription";
import { UserDetails } from "../../types/userDetails";
import { User } from "@supabase/auth-helpers-nextjs";

export type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
    subscription: Subscription | null;
}

export const UserContext = createContext<UserContextType | undefined> (
    undefined
);