import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SharePlaylistModal from "./SharePlaylistModal";
import { fetchPlaylistTracks } from "../queries/spotifyQueries";
import type { Tracks } from "../types/playlist";



interface PlaylistTracksModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistId: string;
    playlistName: string;
}

export const PlaylistTracksModal = ({
    isOpen,
    onClose,
    playlistId,
    playlistName
}: PlaylistTracksModalProps) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['playlistTracks', playlistId],
        queryFn: () => fetchPlaylistTracks(playlistId),
        enabled: isOpen,
    });

    const playlistTracks = data?.currentPlaylistTracks.tracks

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div
                    className="bg-white/90 backdrop-blur-md rounded-lg w-11/12 max-w-4xl max-h-[80vh] flex flex-col shadow-2xl relative"
                >
                    <div className="relative flex justify-center items-center p-6 border-b">
                        <button 
                            onClick={onClose}
                            className="absolute right-6 text-gray-500 hover:text-gray-700 text-xl"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-center">{playlistName}</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 pb-20">
                        {isLoading && (
                            <div className="flex justify-center items-center h-full min-h-[80vh]">
                                <p className="text-gray-500 text-center">Chargement des pistes...</p>
                            </div>
                        )}
                        {isError && (
                            <div className="flex justify-center items-center h-full min-h-[80vh]">
                                <p className="text-red-500 text-center">Erreur lors du chargement des pistes</p>
                            </div>
                        )}
                        {playlistTracks && playlistTracks.length > 0 && (
                            <div className="space-y-4 last:mb-4">
                                {playlistTracks.map((track: Tracks) => (
                                    <div 
                                        key={track.id}
                                        className="flex items-center gap-4 p-3 rounded-lg transition-colors"
                                    >
                                        <div className="w-16 h-16 flex-shrink-0 relative">
                                            <img 
                                                src={track.album_image || 'https://via.placeholder.com/64'} 
                                                alt={track.name}
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-lg truncate">{track.name}</p>
                                            <p className="text-sm text-gray-500 truncate">{track.artist}</p>
                                            <p className="text-xs text-gray-400 truncate">{track.album}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {playlistTracks?.length === 0 && !isLoading && !isError && (
                            <div className="flex justify-center items-center h-full min-h-[80vh]">
                                <p className="text-gray-400 text-center">Cette playlist ne contient aucune piste.</p>
                            </div>
                        )}
                    </div>

                    {!isLoading && !isError && playlistTracks && playlistTracks?.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t">
                            <button 
                                onClick={() => setIsShareModalOpen(true)}
                                className="w-full py-3 px-6 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg flex items-center justify-center gap-2"
                            >
                                <span>🔗</span>
                                <span>Partager cette playlist</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <SharePlaylistModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                playlistId={playlistId}
                playlistName={playlistName}
            />
        </>
    );
};
