// hooks
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

// interfaces
import { Song } from "../../types/song";
import toast from "react-hot-toast";

const useGetSongById = (id?: string) => {
    
    // song states
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);

    const {
        supabaseClient
    } = useSessionContext();

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        const fetchSong = async () => {

            const {
                data,
                error,
            } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }
            
            setSong(data as Song);
            setIsLoading(false);
        }

        fetchSong();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        song,
    }), [isLoading, song]);
};

export default useGetSongById;