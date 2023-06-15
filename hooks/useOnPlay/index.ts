
// custom hooks
import { useUser, useAuthModal, usePlayer } from "..";

// interfaces
import { Song } from "../../types/song";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();

    // auth modal controller
    const authModal = useAuthModal();

    // user state
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) return authModal.onOpen();

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;