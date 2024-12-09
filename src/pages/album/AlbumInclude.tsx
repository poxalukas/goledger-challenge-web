import React, { useEffect, useState } from "react";
import { listarTodosAlbuns } from "../../services/albumService";
import "../../css/include.css";
import { createSong } from "../../services/musicaService";
import { listarTodosArtistas } from "../../services/artistaService";

export function AlbumInclude() {
    const [artists, setArtists] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState("");
    const [albumName, setAlbumName] = useState("");
    const [albumYear, setAlbumYear] = useState("");

    useEffect(() => {
        async function fetchArtists() {
            try {
                const artistsList = await listarTodosArtistas();
                setArtists(artistsList);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchArtists();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedArtist(event.target.value);
    };

    const handleNameChange = (event) => {
        setAlbumName(event.target.value);
    };

    const handleYearChange = (event) => {
        const year = event.target.value;
        setAlbumYear(year);
    };

    const handleSave = async () => {
        if (!selectedArtist || !albumName || !albumYear) {
            console.error("Os campos 'Nome do Album', 'Artista' e 'Ano do Album' são obrigatórios.");
            return;
        }

        const payload = {
            asset: [
                {
                    "@assetType": "album",
                    "name": albumName,
                    "year": albumYear,
                    "artist": {
                        "@assetType": "artist",
                        "@key": selectedArtist,
                    },
                },
            ],
        };

        await createSong(payload)
            .then(() => {
                window.location.href = "/albums";
            })
            .catch((err) => {
                console.error("Erro:", err.message);
            });
    };

    const handleBack = () => {
        window.location.href = "/albums"; 
    };

    return (
        <div className="include-page">
            <div className="form-container">
                <form>
                    <div className="input-group">
                        <label htmlFor="album-name">Nome do Álbum:</label>
                        <input
                            id="album-name"
                            type="text"
                            value={albumName}
                            onChange={handleNameChange}
                            placeholder="Digite o nome do álbum"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="album-year">Ano do Álbum:</label>
                        <input
                            id="album-year"
                            type="number"
                            value={albumYear}
                            onChange={handleYearChange}
                            placeholder="Digite o ano do álbum"
                            max={new Date().getFullYear()}
                            min="1900"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="album-select">Selecione um Artista:</label>
                        <select
                            id="album-select"
                            value={selectedArtist}
                            onChange={handleSelectChange}
                        >
                            <option value="">Selecione</option>
                            {artists?.map((artist) => (
                                <option key={artist["@key"]} value={artist["@key"]}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                    </div>

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
