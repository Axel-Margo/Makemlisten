import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPlaylistTracks } from '../queries/spotifyQueries';

interface PlaylistTracksModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistId: string;
    playlistName: string;
}

const PlaylistTracksModal = ({ isOpen, onClose, playlistId, playlistName }: PlaylistTracksModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [allTracks, setAllTracks] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data: initialData, isLoading, isError } = useQuery({
        queryKey: ['playlistTracks', playlistId, 0],
        queryFn: () => getPlaylistTracks(playlistId, 0, 100),
        enabled: isOpen,
    });

    useEffect(() => {
        if (initialData) {
            setAllTracks(initialData.tracks);
            setHasMore(initialData.tracks.length < initialData.total);
        }
    }, [initialData]);

    const loadMore = async () => {
        if (!hasMore || isLoadingMore) return;
        
        setIsLoadingMore(true);
        const nextOffset = offset + 100;
        try {
            const newData = await getPlaylistTracks(playlistId, nextOffset, 100);
            setAllTracks(prev => [...prev, ...newData.tracks]);
            setOffset(nextOffset);
            setHasMore(newData.tracks.length < newData.total);
        } catch (error) {
            console.error('Error loading more tracks:', error);
        }
        setIsLoadingMore(false);
    };

    const handleScroll = () => {
        if (!contentRef.current) return;
        
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        if (scrollHeight - scrollTop <= clientHeight * 1.5) {
            loadMore();
        }
    };

    useEffect(() => {
        const content = contentRef.current;
        if (content) {
            content.addEventListener('scroll', handleScroll);
            return () => content.removeEventListener('scroll', handleScroll);
        }
    }, [offset, hasMore, isLoadingMore]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div 
                ref={modalRef}
                className="bg-white/90 backdrop-blur-md rounded-lg w-11/12 max-w-4xl max-h-[80vh] flex flex-col shadow-2xl relative"
            >
                {/* Header */}
                <div className="relative flex justify-center items-center p-6 border-b">
                    <button 
                        onClick={onClose}
                        className="absolute right-6 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold text-center">{playlistName}</h2>
                </div>

                {/* Content */}
                <div 
                    ref={contentRef}
                    className="flex-1 overflow-y-auto p-6 pb-20"
                >
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
                    {allTracks && (
                        <div className="space-y-4 last:mb-4">
                            {allTracks.map((track: any) => (
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
                            {isLoadingMore && (
                                <div className="flex justify-center py-4">
                                    <p className="text-gray-500">Chargement des pistes suivantes...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Share Button */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t">
                    <button 
                        className="w-full py-3 px-6 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
                        onClick={() => {
                            console.log('Partager cette playlist:', playlistId);
                        }}
                    >
                        Partager cette playlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaylistTracksModal; 