"use client";

// hooks
import { useRouter } from "next/navigation";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

// custom hooks
import { useAuthModal } from "../../hooks";

// supabase deps
import { ThemeSupa } from "@supabase/auth-ui-shared";

// components
import { Auth } from "@supabase/auth-ui-react";

// custom components
import { CustomButton, Modal } from "..";
import { demoAccount } from "../../constants";

const AuthModal = () => {
    // supabase client
    const supabaseClient = useSupabaseClient();

    // navigator
    const router = useRouter();

    // session
    const { session } = useSessionContext();

    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if(session) {
            router.refresh();
            onClose();
        }
    },[session, router, onClose]);

    const handleChange = (open: boolean) => {
        if(!open) {
            onClose();
        }
    }

    // demo account button
    const handleDemoAccount = async () => {
        try {
            await supabaseClient.auth.signInWithPassword({
                ...demoAccount,
            });
            
        } catch (error: any) {
            
        }
    }

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={handleChange}
        >
            <Auth
                theme="dark"
                providers={["github"]}
                magicLink={true}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e',
                            },
                        },
                    },
                }}
            />
            <CustomButton
                onClick={handleDemoAccount}
            >
                Sign in with DEMO Account
            </CustomButton>
        </Modal>
    )
};

export default AuthModal;