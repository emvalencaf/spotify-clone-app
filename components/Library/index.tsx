"use client";

// custom hooks
import { useAuthModal, useOnPlay, useUploadModal, useUser } from '../../hooks';

// custom components
import { MediaItem } from '..';

// icons
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';

// interfaces
import { Song } from '../../types/song';
export interface LibraryProps {
    songs: Song[];
}

const Library = ({
    songs,
}: LibraryProps) => {
    // modals controller
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();

    const { user } = useUser();

    const onPlay = useOnPlay(songs);

    // handle click events
    const handleClick = () => {
        if (!user) return authModal.onOpen();

        // TODO: Check for subscription

        return uploadModal.onOpen();
    }

    return (
        <div
            className="flex flex-col"
        >
            <div
                className="flex items-center justify-between px-5 pt-4"
            >
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist
                        className='text-neutral-400'
                        size={26}
                    />
                    <p
                        className='text-neutral-400 font-medium text-md'
                    >
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={handleClick}
                    size={20}
                    className='text-neutral-400 cursor-pointer hover:text-white transition'
                />
            </div>
            <div
                className="flex flex-col gap-y-2 mt-4 px-3"
            >
                {
                    songs.map((song) => (
                        <MediaItem
                            key={song.id}
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Library;