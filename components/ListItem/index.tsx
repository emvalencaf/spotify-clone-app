"use client";

// nexts deps
import Image from "next/image";
import { useRouter } from "next/navigation";

// icons
import { FaPlay} from 'react-icons/fa';

// interfaces
export interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem = ({
    image,
    name,
    href,
}: ListItemProps) => {
    // router navigation
    const router = useRouter();

    const handleClick = () => {
        // TODO: Add authentication before push
        router.push(href);
    }

    return (
        <button
            onClick={handleClick}
            className="
            relative 
            group 
            flex 
            items-center 
            rounded-md 
            overflow-hidden 
            gap-x-4 
            bg-neutral-100/10 
            cursor-pointer 
            hover:bg-neutral-100/20 
            transition 
            pr-4
            "
        >
            <div
                className="
                relative min-h-[64px] min-w-[64px]
                "
            >
                <Image
                    src={image}
                    className="object-cover"
                    fill
                    alt={'image'}
                />
            </div>
            <p
                className="
                    font-medium
                    truncate
                    py-5
                "
            >
                {name}
            </p>
            <div
                className="
                absolute 
                transition 
                opacity-0 
                rounded-full 
                flex 
                items-center 
                justify-center 
                bg-green-500 
                p-4 
                drop-shadow-md 
                right-5
                group-hover:opacity-100 
                hover:scale-110
                "
            >
                <FaPlay
                    className="text-black"
                />
            </div>
        </button>
    );

};

export default ListItem;