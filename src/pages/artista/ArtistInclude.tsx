import React, { useEffect, useState } from "react";
import { listarTodosAlbuns } from "../../services/albumService";
import "../../css/include.css";
import { createSong } from "../../services/musicaService";
import { createArtist } from "../../services/artistaService";

export function ArtistInclude() {
    const [artistName, setArtistName] = useState("");
    const [artistCountry, setArtistCountry] = useState("");


    const handleNameChange = (event) => {
        setArtistName(event.target.value);
    };
    const handleCountryChange = (event) => {
        setArtistCountry(event.target.value);
    };

    const handleSave = async () => {
        console.log("Save clicked");
    
        if (!artistName|| !artistCountry) {
            console.error("Os campos 'Nome do Artista' e 'País' são obrigatórios.");
            return;
        }
    
        const payload = {
            asset: [
                {
                    "@assetType": "artist",
                    "name": artistName,
                    "country":  artistCountry
                },
            ],
        };
    
        await createArtist(payload)
            .then(() => {
                console.log("Song criado com sucesso!");
                window.location.href = "/artist";
            })
            .catch((err) => {
                console.error("Erro:", err.message);
            });
    };
    

    const handleBack = () => {
        window.location.href = "/artist"; 
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
                            value={artistName}
                            onChange={handleNameChange}
                            placeholder="Digite o nome da música"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="song-name">Pais do artista:</label>
                        <input
                            id="song-name"
                            type="text"
                            value={artistCountry}
                            onChange={handleCountryChange}
                            placeholder="Digite o pais do artista"
                        />
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
