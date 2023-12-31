"use client";

// custom hooks
import { useGetSongById, useLoadSongUrl, usePlayer } from "../../hooks";

// custom components
import { PlayerContent } from "..";

const Player = () => {
    // store player
    const player = usePlayer();

    // get song
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) return null;

    return (
        <div
            className="
            fixed
            bottom-0
            bg-black
            w-full
            py-2
            h-[80px]
            px-4
            "
        >
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
};

export default Player;