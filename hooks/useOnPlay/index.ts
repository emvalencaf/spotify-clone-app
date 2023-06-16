
// custom hooks
import { useUser, useAuthModal, usePlayer, useSubscribeModal } from "..";

// interfaces
import { Song } from "../../types/song";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();

    // modals controller
    const authModal = useAuthModal();
    const subscribeModal = useSubscribeModal();
    // user state
    const { user, subscription } = useUser();

    const onPlay = (id: string) => {
        if (!user) return authModal.onOpen();

        if (!subscription) return subscribeModal.onOpen();

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}

export default useOnPlay;