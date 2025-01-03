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
import { deleteSong, excluirSom, listarTodosSons } from "../../services/musicaService";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

export function SomHome() {
    const navigate = useNavigate();
    const [dataSom, setDataSom] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [somToDelete, setSomToDelete] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sons = await listarTodosSons();
                setDataSom(sons);
                setFilteredData(sons);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filtered = dataSom.filter((som) =>
            som?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchQuery, dataSom]);

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
        };

        const handleEditarClick = () => {
            localStorage.setItem("botaoAcessado", "editar");
        };
        const handleExcluirClick = (som) => {
            setSomToDelete(som);
            setShowDeleteModal(true);
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
                    onClick={() => handleExcluirClick(data)}
                />
            </div>
        );
    };

    const handleCancelarExclusao = () => {
        setShowDeleteModal(false);
        setSomToDelete(null);
    };

    const handleConfirmarExclusao = async () => {
        try {
            if (somToDelete) {
                const songKey = somToDelete["@key"];
                const songData = {
                    key: {
                        "@assetType": "song",
                        "@key": songKey
                    },
                    cascade: true,
                };
                await deleteSong(songData);
                setFilteredData(
                    filteredData.filter((song) => song["@key"] !== songKey)
                );
                setShowDeleteModal(false);
            }
        } catch (err) {
            setError("Erro ao excluir o som");
        }
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
                                title="Adicionar nova Musica"
                                onClick={event =>  window.location.href='/musicas/add'}
                            
                            >
                                +
                            </button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableHead>Nome</TableHead>
                            </TableHeader>
                            <TableBody>
                                {currentItems.map((som, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{som?.name}</TableCell>
                                        <TableCell>
                                            {actionTemplate(som)}
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
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
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
                    Tem certeza de que deseja excluir o som "{somToDelete ? somToDelete.name : ''}"?
                </p>
            </Dialog>
        </>
    );
}


