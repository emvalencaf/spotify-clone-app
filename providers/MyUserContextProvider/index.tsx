"use client";

// supabase hooks
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

// react hooks
import { useEffect, useState } from "react";

// contexts
import { UserContext } from "../../contexts";

// interfaces
import { Subscription } from "../../types/subscription";
import { UserDetails } from "../../types/userDetails";

interface Props {
    [propName: string]: any;
}

const MyUserContextProvider = (props: Props) => {

    // sessions
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase,
    } = useSessionContext();

    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    
    // user details states 
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    // get user details data from supabase
    const getUserDetails = () => supabase.from('users').select('*').single();

    // get subscription data from supabase
    const getSubscription = () =>
      supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();
  
    useEffect(() => {
      if (user && !isLoadingData && !userDetails && !subscription) {
        setIsLoadingData(true);
        Promise.allSettled([getUserDetails(), getSubscription()]).then(
          (results) => {
            const userDetailsPromise = results[0];
            const subscriptionPromise = results[1];
  
            if (userDetailsPromise.status === 'fulfilled')
              setUserDetails(userDetailsPromise.value.data as UserDetails);
  
            if (subscriptionPromise.status === 'fulfilled')
              setSubscription(subscriptionPromise.value.data as Subscription);
  
            setIsLoadingData(false);
          }
        );
      } else if (!user && !isLoadingUser && !isLoadingData) {
        setUserDetails(null);
        setSubscription(null);
      }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription,
    };

    return <UserContext.Provider value={value} {...props} />
}

export default MyUserContextProvider;