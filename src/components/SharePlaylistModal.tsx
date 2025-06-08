import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface SharePlaylistModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistId: string;
    playlistName: string;
}

const SharePlaylistModal = ({ isOpen, onClose, playlistId, playlistName }: SharePlaylistModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const navigate = useNavigate();

    // Générer un lien de partage unique
    const shareLink = `${window.location.origin}/share/${playlistId}`;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Erreur lors de la copie:', err);
        }
    };

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
                className="bg-white/90 backdrop-blur-md rounded-lg w-11/12 max-w-lg p-6 shadow-2xl relative"
            >
                {/* Header */}
                <div className="relative flex justify-center items-center mb-6">
                    <button 
                        onClick={onClose}
                        className="absolute right-0 text-gray-500 hover:text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold text-center">Partager la playlist</h2>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    <p className="text-gray-600 text-center">
                        Partagez cette playlist avec d'autres utilisateurs. Ils pourront l'importer sur leur plateforme préférée.
                    </p>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-2">Lien de partage :</p>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={shareLink}
                                readOnly
                                className="flex-1 p-2 border rounded bg-white text-sm"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                            >
                                {copySuccess ? '✓' : 'Copier'}
                            </button>
                        </div>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                        Ce lien permettra aux autres utilisateurs d'importer la playlist sur leur plateforme préférée.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePlaylistModal; 