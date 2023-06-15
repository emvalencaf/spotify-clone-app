// hooks
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// interfaces
import { Song } from "../../types/song";

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song) return null;

    const {
        data: imageData,
    } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
}

export default useLoadImage;