// hooks
import { useContext } from "react";

// contexts
import { UserContext } from "../../contexts";

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) throw new Error('useUser must be used within a MyUserContextProvider');

    return context;
}