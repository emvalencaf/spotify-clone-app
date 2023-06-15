"use client";

// hooks
import { useUploadModal, useUser } from "../../hooks";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

// custom components
import { CustomButton, CustomInput, Modal } from "..";

// utils
import { toast } from "react-hot-toast";
import uniqid from "uniqid";

const UploadModal = () => {
    // router
    const router = useRouter();

    // auth
    const { user } = useUser();

    // spabase client
    const supabaseClient = useSupabaseClient();

    // states
    const [isLoading, setIsLoading] = useState(false);

    // modal controller
    const uploadModal = useUploadModal();

    const {
        register,
        handleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) return toast.error('Missing fields');

            const uniqueID = uniqid();

            // Upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload.');
            }

            // Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload.');
            }

            const {
                error: supabaseError,
            } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError?.message);
            }

            router.refresh();

            setIsLoading(false);

            toast.success('Song created!');
            reset();

            uploadModal.onClose();
        } catch (error) {
            setIsLoading(false);
            toast.error("Something went wrong!");
        } finally {
        }
    }

    const handleChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose()
        };
    }

    return (
        <Modal
            title="Add a song"
            description="Upload a mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={handleChange}
        >
            <form className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(onSubmit)}>
                <CustomInput
                    id="title"
                    disabled={isLoading}
                    {...register('title', {
                        required: true,
                    })}
                    placeholder="Song title"
                />
                <CustomInput
                    id="author"
                    disabled={isLoading}
                    {
                    ...register('author', {
                        required: true,
                    })
                    }
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <CustomInput
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {
                            ...register('song', {
                                required: true,
                            })
                        }
                    />
                </div>
                <div>
                    <div className="pb-1">
                        Select a image
                    </div>
                    <CustomInput
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    />
                </div>
                <CustomButton
                    disabled={isLoading}
                    type="submit"
                >
                    Create
                </CustomButton>
            </form>
        </Modal>
    );
};

export default UploadModal;