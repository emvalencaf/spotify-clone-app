"use client";

import { useRouter } from "next/navigation";
import { useSubscribeModal, useUser } from "../../hooks";
import { useEffect, useState } from "react";
import { postData } from "../../libs/helpers";
import { toast } from "react-hot-toast";
import { CustomButton } from "..";

const AccountContent = () => {
    // router navigation
    const router = useRouter();

    // modal controller
    const subscribeModal = useSubscribeModal();

    // user states
    const {
        isLoading,
        subscription,
        user
    } = useUser();

    // loading states
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) router.replace('/');
    },[isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const {
                url,
                error
            } = await postData({
                url: '/api/create-portal-link',
            });

            window.location.assign(url);
        } catch (error: any) {
            toast.error((error as Error)?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="mb-7 px-6"
        >
            {!subscription && (
                <div
                    className="flex flex-col gap-y-4"
                >
                    <p>
                        No active plan.
                    </p>
                    <button
                        onClick={subscribeModal.onOpen}
                        className="w-[300px]"
                    >
                        Subscriibe
                    </button>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are currently on the <b>{subscription?.prices?.products?.name}</b> plan.
                    </p>
                    <CustomButton
                        disabled={loading || isLoading}
                        onClick={redirectToCustomerPortal}
                        className="w-[300px]"
                    >
                        Open customer portal
                    </CustomButton>
                </div>
            )}
        </div>
    );
};

export default AccountContent;