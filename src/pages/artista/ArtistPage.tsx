import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/sidebar.css";
import { listarTodosArtistas } from "../../services/artistaService";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

export function ArtistHome() {
    const [dataArtista, setDataArtista] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const artistas = await listarTodosArtistas();
                setDataArtista(artistas);
                setFilteredData(artistas);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = dataArtista.filter((artista) =>
            artista.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchQuery, dataArtista]);

    if (!filteredData.length) {
        return <div className="spinner"></div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const actionTemplate = (data) => {
        const handleVisualizarClick = () => {
            localStorage.setItem("botaoAcessado", "visualizar");
            window.location.href = `/cadastrabalanca?id=${data.id}`;
        };

        const handleEditarClick = () => {
            localStorage.setItem("botaoAcessado", "editar");
            window.location.href = `/cadastrabalanca?id=${data.id}`;
        };

        return (
            <div className="button-container">
                <Button
                    icon="pi pi-pencil"
                    className="p-button"
                    rounded
                    text
                    onClick={handleVisualizarClick}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button"
                    rounded
                    text
                    onClick={handleEditarClick}
                />
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="p-6 max-w-4xl mx-auto">
                    <div className="border rounded">
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Pesquisar por nome"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input-search"
                            />
                            <button
                                className="add-button"
                                title="Adicionar novo Artista"
                                onClick={() => hand}
                            >
                                +
                            </button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableHead>Nome</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((artista, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{artista.name}</TableCell>
                                        <TableCell>
                                            {actionTemplate(artista)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
                                filteredData.length
                            )} de ${filteredData.length} resultados`}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
