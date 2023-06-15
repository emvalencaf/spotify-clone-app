// hooks
import { useContext } from "react";

// contexts
import { UserContext } from "../../contexts";

const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) throw new Error('useUser must be used within a MyUserContextProvider');

    return context;
}

export default useUser;