"use client";

// hooks
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// custom hooks
import { useAuthModal, usePlayer, useUser } from "../../hooks";

// icons
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { BiSearch } from 'react-icons/bi';

// tailwindcss deps
import { twMerge } from "tailwind-merge";
import { CustomButton } from "..";
import { FaUserAlt } from "react-icons/fa";

// toast deps
import toast from "react-hot-toast";

// types
export interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({
    children,
    className,
}: HeaderProps) => {
    const player = usePlayer();
    // router states
    const router = useRouter();

    // get auth modal funcs
    const authModal = useAuthModal();

    // supabase client
    const supabaseClient = useSupabaseClient();

    const { user } = useUser();

    console.log(user);

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        player.reset();

        router.refresh();

        error ? toast.error(error.message) : toast.success('Logged out');
    }

    return (
        <div
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `, className)}
        >
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        onClick={() => router.push('/')}
                        className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                        className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <CustomButton
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </CustomButton>
                            <CustomButton
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </CustomButton>
                        </div>
                    ) : (
                        <>
                            <div>
                                <CustomButton
                                    onClick={authModal.onOpen}
                                    className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                                >
                                    Sign up
                                </CustomButton>
                            </div>
                            <div>
                                <CustomButton
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </CustomButton>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div >
    );
}

export default Header;