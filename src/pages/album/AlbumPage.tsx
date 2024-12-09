import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/sidebar.css";
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
import { listarTodosAlbuns, excluirAlbum } from "../../services/albumService";
import { Dialog } from "primereact/dialog";

export function AlbumHome() {
    const [dataAlbum, setDataAlbum] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [albumToDelete, setAlbumToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albums = await listarTodosAlbuns();
                setDataAlbum(albums);
                setFilteredData(albums);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = dataAlbum.filter((album) =>
            album.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchQuery, dataAlbum]);

    if (!filteredData.length) {
        return <div className="spinner"></div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const actionTemplate = (data) => {
        const handleExcluirClick = (album) => {
            setAlbumToDelete(album);
            setShowDeleteModal(true);
        };

        const handleEditarClick = () => {};

        return (
            <div className="button-container">
                <Button
                    icon="pi pi-pencil"
                    className="p-button"
                    rounded
                    text
                    onClick={handleEditarClick}
                />
                <Button
                    icon="pi pi-trash"
                    className="p-button"
                    rounded
                    text
                    onClick={() => handleExcluirClick(data)}
                />
            </div>
        );
    };

    const handleConfirmarExclusao = async () => {
        try {
            if (albumToDelete) {
                const albumKey = albumToDelete["@key"];
                const albumData = {
                    key: {
                        "@assetType": "album",
                        "@key": albumKey,
                        name: albumToDelete.name,
                        artist: albumToDelete.artist,
                    },
                    cascade: true,
                };
                await excluirAlbum(albumData);
                setFilteredData(
                    filteredData.filter((album) => album["@key"] !== albumKey)
                );
                setShowDeleteModal(false);
            }
        } catch (err) {
            setError("Erro ao excluir o álbum");
        }
    };

    const handleCancelarExclusao = () => {
        setShowDeleteModal(false);
        setAlbumToDelete(null);
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
                                title="Adicionar novo Album"
                                onClick={event =>  window.location.href='/albums/add'}                             >
                                +
                            </button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableHead>Nome</TableHead>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((album, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{album.name}</TableCell>
                                        <TableCell>
                                            {actionTemplate(album)}
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

            <Dialog
                visible={showDeleteModal}
                onHide={handleCancelarExclusao}
                header="Confirmação de Exclusão"
                style={{
                    backgroundColor: "#444444",
                    width: "600px",
                    height: "auto",
                    padding: "20px",
                    border: "2px solid #ffffff",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "10px",
                }}
                footer={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                        }}
                    >
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={handleCancelarExclusao}
                            className="p-button-outlined p-button-text"
                            style={{
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                padding: "10px 20px",
                            }}
                        />
                        <Button
                            label="Confirmar"
                            icon="pi pi-check"
                            onClick={handleConfirmarExclusao}
                            className="p-button-outlined p-button-text"
                            style={{
                                backgroundColor: "#6c757d",
                                color: "#fff",
                                padding: "10px 20px",
                            }}
                        />
                    </div>
                }
            >
                <p style={{ marginTop: "30px", marginBottom: "30px" }}>
                    Tem certeza de que deseja excluir o álbum "
                    {albumToDelete ? albumToDelete.name : ""}"?
                </p>
            </Dialog>
        </>
    );
}
