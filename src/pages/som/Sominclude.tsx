import React, { useEffect, useState } from "react";
import { listarTodosAlbuns } from "../../services/albumService";
import "../../css/include.css";
import { createSong } from "../../services/musicaService";

export function SomInclude() {
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [songName, setSongName] = useState("");

    useEffect(() => {
        async function fetchAlbums() {
            try {
                const albumList = await listarTodosAlbuns();
                setAlbums(albumList);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchAlbums();
    }, []);

    const handleSelectChange = (event) => {
        setSelectedAlbum(event.target.value);
    };

    const handleNameChange = (event) => {
        setSongName(event.target.value);
    };

    const handleSave = async () => {
        console.log("Save clicked");
    
        if (!selectedAlbum || !songName) {
            console.error("Os campos 'Nome da Música' e 'Álbum' são obrigatórios.");
            return;
        }
    
        const payload = {
            asset: [
                {
                    "@assetType": "song",
                    "name": songName,
                    "album": {
                        "@assetType": "album",
                        "@key": selectedAlbum,
                    },
                },
            ],
        };
    
        await createSong(payload)
            .then(() => {
                console.log("Song criado com sucesso!");
                window.location.href = "/musicas";
            })
            .catch((err) => {
                console.error("Erro:", err.message);
            });
    };
    

    const handleBack = () => {
        window.location.href = "/musicas"; 
    };

    return (
        <div className="include-page">
            <div className="form-container">
                <form>
                    <div className="input-group">
                        <label htmlFor="song-name">Nome da Música:</label>
                        <input
                            id="song-name"
                            type="text"
                            value={songName}
                            onChange={handleNameChange}
                            placeholder="Digite o nome da música"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="album-select">Selecione um Álbum:</label>
                        <select
                            id="album-select"
                            value={selectedAlbum}
                            onChange={handleSelectChange}
                        >
                            <option value="">Selecione</option>
                            {albums.map((album) => (
                                <option key={album["@key"]} value={album["@key"]}>
                                    {album.name}
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
