import { useEffect, useState } from "react";
import Slider from "react-slick"; // Importa o carrossel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { listarTodosArtistas } from "./services/artistaService";
import "./css/spinner.css";
import { listarTodosSons } from "./services/musicaService";
import SliderSection, { Carrossel } from "./components/carrossel";
import { listarTodasPlaylist } from "./services/playlistService";

export function HomePage() {
    const [dataArtista, setDataArtista] = useState([]);
    const [dataAlbum, setDataAlbum] = useState([]);
    const [dataMusica, setDataMusica] = useState([]);
    const [dataPlaylist, setDataPlaylist] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistas = await listarTodosArtistas();
                setDataArtista(artistas);
                const sons = await listarTodosSons();
                setDataMusica(sons);
                const playslist = await listarTodasPlaylist();
                setDataPlaylist(playslist);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    if (!dataArtista.length) {
        return <div className="spinner"></div>;
    }

	return (
		<>
		  <Carrossel
			title="Artistas"
			data={dataArtista}
		  />
		  <Carrossel
			title="Albuns"
			data={dataMusica}
		  />

<Carrossel
			title="Playlists"
			data={dataPlaylist}
		  />
		</>
	  );
	};
