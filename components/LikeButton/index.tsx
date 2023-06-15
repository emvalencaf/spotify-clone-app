"use client";

// hooks
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// custom hooks
import { useAuthModal, useUser } from "../../hooks";

// icons
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// toaster
import toast from "react-hot-toast";

// interface
export interface LikeButtonProps {
    songId: string;
}

const LikeButton = ({
    songId,
}: LikeButtonProps) => {

    // navigator
    const router = useRouter();

    // supabase client
    const { supabaseClient } = useSessionContext();

    // auth modal controller
    const authModal = useAuthModal();

    // get user
    const { user } = useUser();

    // like states
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const {
                data,
                error
            } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single();

            if (!error && data) setIsLiked(true);
        };

        fetchData();

    }, [songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const  handleLike = async () => {
        if (!user) return authModal.onOpen();

        if (isLiked) {
            const {
                error
            } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId);

            error ? toast.error(error.message) : setIsLiked(false);
        } else {
            const {
                error
            } = await supabaseClient
                .from('liked_songs')
                .insert({
                    song_id: songId,
                    user_id: user.id,
                });
            
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true)
                toast.success('Liked!');
            }
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className="
            hover:opacity-75
            transition
            "
        >
            <Icon
                className={isLiked ? '#22c55e': 'white'}
                size={25}
            />
        </button>
    );
};

export default LikeButton;