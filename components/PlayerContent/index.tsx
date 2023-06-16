"use client";

// custum components
import { LikeButton, MediaItem, Slider } from '../';

// icons
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

// interfaces
import { Song } from "../../types/song";
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { usePlayer } from '../../hooks';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';

export interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent = ({
    song,
    songUrl,
}: PlayerContentProps) => {

    // store player
    const player = usePlayer();

    // volume states
    const [volume, setVolume] = useState(1);

    // player states
    const [isPlaying, setIsPlaying] = useState(false);

    // component icon to set play
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;

    // component icon to set volume
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) return player.setId(player.ids[0]);

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);

        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) return player.setId(player.ids[player.ids.length -1]);

        player.setId(previousSong);
    }

    const [play, {
        pause,
        sound,
    }] = useSound(songUrl, {
        volume: volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ['mp3'],
    });


    // to start music when the component is mounted
    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    },[sound]);

    // handle set play/stop music
    const handlePlay = () => !isPlaying ? play() : pause();

    // handle set mute/unmute music
    const toggleMute = () => volume === 0 ? setVolume(1) : setVolume(0);

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 h-full"
        >
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem
                        data={song}
                    />
                    <LikeButton
                        songId={song.id}
                    />
                </div>
            </div>
            <div
                className="
                flex
                md:hidden
                col-auto
                w-full
                justify-end
                items-center
                "
            >
                <div
                    onClick={handlePlay}
                    className="
                    h-10
                    w-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    p-1
                    cursor-pointer
                    "
                >
                    <Icon 
                        size={30}
                        className='text-black'
                    />
                </div>
            </div>

        <div
            className="
            hidden
            h-full
            md:flex
            justify-center
            items-center
            w-full
            max-w-[722px]
            gap-x-6
            "
        >
            <AiFillStepBackward
                onClick={onPlayPrevious}
                size={30}
                className='
                text-neutral-400
                cursor-pointer
                hoverr:text-white
                transition
                '
            />

            <div
                onClick={handlePlay}
                className='
                flex
                items-center
                justify-center
                h-10
                w-10
                rounded-full
                bg-white
                p-1
                cursor-pointer
                '
            >
                <Icon
                    className='text-black'
                    size={30}
                />

            </div>
            <AiFillStepForward
                size={30}
                onClick={onPlayNext}
                className='
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition
                '
            />
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="
                        cursor-pointer
                        "
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>

        </div>
    );
};

export default PlayerContent;