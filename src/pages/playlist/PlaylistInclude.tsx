import React, { useEffect, useState } from "react";
import { listarTodosSons } from "../../services/musicaService";
import "../../css/include.css";
import { createSong } from "../../services/musicaService";
import { createPlaylist } from "../../services/playlistService";

export function PlaylistInclude() {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [isPrivate, setPrivate] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(5);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const songsList = await listarTodosSons();
                setSongs(songsList);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchSongs();
    }, []);

    const handleNameChange = (event) => {
        setPlaylistName(event.target.value);
    };

    const handlePrivateChange = (event) => {
        setPrivate(event.target.checked);
    };

    const handleSongSelect = (event) => {
        const { value, checked } = event.target;
        setSelectedSongs((prevSelectedSongs) =>
            checked
                ? [...prevSelectedSongs, value]
                : prevSelectedSongs.filter((song) => song !== value)
        );
    };

    const handleSave = async () => {
        if (!playlistName || !selectedSongs.length) {
            console.error("Os campos 'Nome da Playlist' e 'Pelo menos uma música' são obrigatórios.");
            return;
        }

        const payload = {
            asset: [
                {
                    "@assetType": "playlist",
                    "name": playlistName,
                    "private": isPrivate,
                    "songs": selectedSongs.map((songId) => ({
                        "@assetType": "song",
                        "@key": songId,
                    })),
                },
            ],
        };

        await createPlaylist(payload)
            .then(() => {
                console.log("Playlist criada com sucesso!");
                window.location.href = "/musicas";
            })
            .catch((err) => {
                console.error("Erro:", err.message);
            });
    };

    const handleBack = () => {
        window.location.href = "/musicas"; 
    };

    // Paginando as músicas
    const indexOfLastItem = currentPage * songsPerPage;
    const indexOfFirstItem = indexOfLastItem - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(songs.length / songsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="include-page">
            <div className="form-container">
                <form>
                    <div className="input-group">
                        <label htmlFor="playlist-name">Nome da Playlist:</label>
                        <input
                            id="playlist-name"
                            type="text"
                            value={playlistName}
                            onChange={handleNameChange}
                            placeholder="Digite o nome da playlist"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="playlist-privacy" className="checkbox-label">
                            Privada:
                        </label>
                        <input
                            id="playlist-privacy"
                            type="checkbox"
                            checked={isPrivate}
                            onChange={handlePrivateChange}
                            className="checkbox-input"
                        />
                    </div>

                    <div className="input-group">
                        <label>Músicas:</label>
                        <div className="song-list">
                            {currentSongs?.map((song) => (
                                <div key={song["@key"]} className="song-item">
                                    <input
                                        type="checkbox"
                                        value={song["@key"]}
                                        onChange={handleSongSelect}
                                        className="song-checkbox"
                                    />
                                    <label>{song.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pagination w-full flex justify-between items-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-[#222222] text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span
                            style={{
                                paddingRight: "100px",
                                paddingLeft: "100px",
                            }}
                        >{`Página ${currentPage} de ${totalPages}`}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-[#222222] text-white py-2 px-4 rounded disabled:opacity-50"
                        >
                            Próxima
                        </button>
                    </div>
                    <span className="text-center">
                        {`Exibindo ${indexOfFirstItem + 1} a ${Math.min(
                            indexOfLastItem,
                            songs.length
                        )} de ${songs.length} resultados`}
                    </span>

                    <div className="button-group">
                        <button type="button" onClick={handleSave} className="save-button">
                            Salvar
                        </button>
                        <button type="button" onClick={handleBack} className="back-button">
                            Voltar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
