import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchCurrentPlaylist, fetchEntirePlaylistTracks } from "../../queries/spotifyQueries";
import { importPlaylist } from "../../services/playlistImport";

const platforms = [
    {
        name: 'Spotify',
        logo: 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png',
        color: 'bg-green-800',
        hoverColor: 'hover:bg-green-900'
    },
    {
        name: 'Apple Music',
        logo: 'https://developer.apple.com/design/human-interface-guidelines/foundations/branding/images/apple-music-logo_2x.png',
        color: 'bg-[#FA243C]',
        hoverColor: 'hover:bg-[#ff2d47]'
    },
    {
        name: 'Deezer',
        logo: 'https://e-cdns-files.dzcdn.net/cache/images/common/logos/deezer-logo.png',
        color: 'bg-[#00C7F2]',
        hoverColor: 'hover:bg-[#00d8ff]'
    },
    {
        name: 'Tidal',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Tidal_logo.svg/2560px-Tidal_logo.svg.png',
        color: 'bg-black',
        hoverColor: 'hover:bg-gray-900'
    }
];
export const Route = createFileRoute('/share/$playlistId')({
    component: SharePlaylistPage,
  });
  
function SharePlaylistPage () {
    const { playlistId } = useParams({ from: '/share/$playlistId' });
    const [importingPlatform, setImportingPlatform] = useState<string | null>(null);
    const [importResult, setImportResult] = useState<{ success: boolean; message: string; url?: string } | null>(null);
    const [playlistName, setPlaylistName] = useState<any>(null);

    

    const { data: tracksData, isLoading: isLoadingTracks, isError: isErrorTracks } = useQuery({
        queryKey: ['playlistTracks', playlistId],
        queryFn: () => fetchEntirePlaylistTracks(playlistId),
    });

    const { data: playlistData, isLoading: isLoadingPlaylist, isError: isErrorPlaylist } = useQuery({
        queryKey: ['playlistInfos', playlistId],
        queryFn: () => fetchCurrentPlaylist(playlistId),
    });


    useEffect(() => {
        if (playlistData) {
            setPlaylistName(playlistData.currentPlaylist.name);
        }
    }, [playlistData]);

    const handleImport = async (platform: string) => {
        setImportingPlatform(platform);
        setImportResult(null);
        
        try {
            const result = await importPlaylist(playlistId, platform);
            setImportResult(result);
            
            if (result.success && result.playlistUrl) {
                setTimeout(() => {
                    window.open(result.playlistUrl, '_blank');
                }, 1500);
            }
        } catch (error) {
            setImportResult({
                success: false,
                message: `Erreur lors de l'importation vers ${platform}`
            });
        } finally {
            setImportingPlatform(null);
        }
    };

    if (isLoadingTracks || isLoadingPlaylist) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
    <p className="text-gray-500 mb-4">Chargement de la playlist...</p>
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
        );
    }

    if (isErrorTracks || isErrorPlaylist) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Erreur lors du chargement de la playlist</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* En-tête */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Importer la playlist {playlistName}
                    </h1>
                    <p className="text-lg text-gray-600">
                        Choisissez votre plateforme préférée pour importer cette playlist
                    </p>
                </div>

                {/* Message de résultat */}
                {importResult && (
                    <div className={`mb-8 p-4 rounded-lg ${
                        importResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    }`}>
                        <p className="text-center">{importResult.message}</p>
                    </div>
                )}

                {/* Liste des plateformes */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {platforms.map((platform) => (
                        <button
                            key={platform.name}
                            onClick={() => handleImport(platform.name)}
                            disabled={importingPlatform === platform.name}
                            className={`${platform.color} ${platform.hoverColor} p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            <img
                                src={platform.logo}
                                alt={`${platform.name} logo`}
                                className="h-8 object-contain"
                            />
                            <span className="text-white font-medium">
                                {importingPlatform === platform.name ? (
                                    'Importation en cours...'
                                ) : (
                                    `Importer sur ${platform.name}`
                                )}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Informations sur la playlist */}
                <div className="mt-12 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Détails de la playlist</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Nombre de pistes :</span> {tracksData?.total}  </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePlaylistPage; 