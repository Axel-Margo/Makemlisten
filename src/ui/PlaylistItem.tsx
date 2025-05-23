import { useState } from 'react';
import PlaylistTracksModal from './PlaylistTracksModal';

interface PlaylistItemProps {
    id: string;
    name: string;
    image?: string;
    owner?: string;
    tracks?: number;
    link?: string;
    onClick?: () => void;
}

export const PlaylistItem = ({ id, name, image, owner, tracks, link, onClick }: PlaylistItemProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        console.log('Playlist ID:', id);
        setIsModalOpen(true);
        onClick?.();
    };

    return (
        <>
            <div
                key={id}
                className="flex flex-row mt-4 first:mt-0 border-black/20 border cursor-pointer hover:bg-neutral-100 h-32" 
                onClick={handleClick}
            >
                <div className="w-1/3 h-full">
                    <img 
                        src={image || "#"} 
                        alt="Playlist Img" 
                        className="h-full w-full object-fit" 
                    />
                </div>
                
                <div className="w-2/3 border-black bg-neutral-50 h-full p-2">
                    <div className="flex flex-col justify-between h-full">
                        <p className="font-medium text-lg">{name}</p>
                        <div>
                            <p className="text-neutral-400">{owner || 'unknown creator'} </p>
                        </div>
                        <div className="flex flex-row justify-between mt-6">
                            <p className="text-neutral-400">{tracks || 0} titres</p>
                        </div>
                    </div>
                </div>
            </div>

            <PlaylistTracksModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                playlistId={id}
                playlistName={name}
            />
        </>
    );
} 