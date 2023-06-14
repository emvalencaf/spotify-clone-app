"use client";

// hooks
import { useRouter } from "next/navigation";

// icons
import { HiHome } from 'react-icons/hi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { BiSearch } from 'react-icons/bi';

// tailwindcss deps
import { twMerge } from "tailwind-merge";
import { CustomButton } from "..";
import { useAuthModal } from "../../hooks";

// types
export interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header = ({
    children,
    className = "",
}: HeaderProps) => {
    // router states
    const router = useRouter();

    const authModal = useAuthModal();

    const handleLogout = () => {
        // TODO: handle logout
    }

    return (
        <header
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `, className)}
        >
            <div
                className="w-full mb-4 flex items-center justify-between"
            >
                <div
                    className="hidden md:flex gap-x-2 items-center"
                >
                    <button
                        className="              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition"
                    >
                        <RxCaretLeft
                            onClick={() => router.back()}
                            className="text-white"
                            size={35}
                        />
                    </button>
                    <button
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
                        <RxCaretRight
                            onClick={() => router.forward()}
                            className="text-white"
                            size={35}
                        />
                    </button>
                </div>
                <div
                    className="flex md:hidden gap-x-2 items-center"
                >
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
                        <HiHome
                            className="text-black"
                            size={20}
                        />
                    </button>
                    <button
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
                        <BiSearch
                            className="text-black"
                            size={20}
                        />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    <>
                        <div>
                            <CustomButton
                                onClick={authModal.onOpen}
                                className="bg-transparent text-neutral-300 font-medium"
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
                </div>
            </div>
            {children}
        </header>
    );
}

export default Header;