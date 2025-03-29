import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card, Spinner } from 'react-bootstrap';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { Operadora } from '../types/operadoras';
import OperadoraCard from '../components/operadoras/OperadoraCard';
import OperadoraDetails from '../components/operadoras/OperadoraDetails';
import OperadoraFilter from '../components/operadoras/OperadoraFilter';
import { filterOperadoras, getModalidades, getOperadoras } from '../services/operadorasService';

const OperadoraList = () => {
    const [operadoras, setOperadoras] = useState<Operadora[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOperadora, setSelectedOperadora] = useState<Operadora | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalidade, setModalidade] = useState('Todas');
    const [modalidades, setModalidades] = useState<string[]>(['Todas']);
    const [uf, setUf] = useState('Todos');
    const [cidade, setCidade] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [paginatedOperadoras, setPaginatedOperadoras] = useState<Operadora[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getOperadoras();
                setOperadoras(data);
                setTotalPages(Math.ceil(data.length / itemsPerPage));
                setModalidades(await getModalidades());
            } catch (error) {
                toast.error('Erro ao carregar dados: Não foi possível carregar a lista de operadoras.');
                console.error('Erro ao buscar operadoras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [itemsPerPage]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedOperadoras(operadoras.slice(startIndex, endIndex));
    }, [operadoras, currentPage, itemsPerPage]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const filteredData = await filterOperadoras({
                termo: searchTerm,
                modalidade,
                uf,
                cidade
            });
            setOperadoras(filteredData);
            setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
            setCurrentPage(1); // Reset to first page after search
        } catch (error) {
            toast.error('Erro ao filtrar: Não foi possível aplicar os filtros.');
            console.error('Erro ao filtrar operadoras:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetails = (operadora: Operadora) => {
        setSelectedOperadora(operadora);
    };

    const handleCloseDetails = () => {
        setSelectedOperadora(null);
    };

    const handleResetFilters = async () => {
        setSearchTerm('');
        setModalidade('Todas');
        setUf('Todos');
        setCidade('');
        setLoading(true);

        try {
            const data = await getOperadoras();
            setOperadoras(data);
            setTotalPages(Math.ceil(data.length / itemsPerPage));
            setCurrentPage(1); // Reset to first page
        } catch (error) {
            console.error(error);
            toast.error('Erro ao redefinir: Não foi possível redefinir os filtros.');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async () => {
        await handleSearch();
        setFilterOpen(false);
    };

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Generate pagination items
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        // eslint-disable-next-line prefer-const
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            items.push(
                <li key='start' className='page-item'>
                    <Button variant='light' className='page-link' onClick={() => goToPage(1)}>1</Button>
                </li>
            );
            if (startPage > 2) {
                items.push(<li key='ellipsis1' className='page-item disabled'><span className='page-link'>...</span></li>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <Button
                        variant={currentPage === i ? 'primary' : 'light'}
                        className='page-link'
                        onClick={() => goToPage(i)}
                    >
                        {i}
                    </Button>
                </li>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(<li key='ellipsis2' className='page-item disabled'><span className='page-link'>...</span></li>);
            }
            items.push(
                <li key='end' className='page-item'>
                    <Button variant='light' className='page-link' onClick={() => goToPage(totalPages)}>{totalPages}</Button>
                </li>
            );
        }

        return items;
    };

    return (
        <Container className='py-4'>
            <h2 className='mb-4'>Operadoras de Saúde</h2>

            <div className='mb-4'>
                <Row>
                    <Col xs={12} md={8} lg={9}>
                        <InputGroup>
                            <Form.Control
                                type='text'
                                placeholder='Buscar por nome...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button variant='primary' onClick={handleSearch}>
                                <Search size={18} /> Buscar
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={4} lg={3} className='mt-3 mt-md-0'>
                        <Button
                            variant='outline-secondary'
                            className='w-100'
                            onClick={() => setFilterOpen(true)}
                        >
                            <Filter size={18} className='me-2' /> Filtros Avançados
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* Loading Spinner */}
            {loading && (
                <div className='text-center py-5'>
                    <Spinner animation='border' variant='primary' role='status' className='mb-2' />
                    <p className='text-muted'>Carregando operadoras...</p>
                </div>
            )}

            {/* No results message */}
            {operadoras.length === 0 && !loading ? (
                <Card className='text-center p-5 bg-light'>
                    <Card.Body>
                        <p className='text-muted mb-3'>Nenhuma operadora encontrada com os filtros selecionados.</p>
                        <Button
                            variant='outline-secondary'
                            onClick={handleResetFilters}
                        >
                            Limpar Filtros
                        </Button>
                    </Card.Body>
                </Card>
            ) : !loading && (
                <>
                    <Row xs={1} md={2} lg={3} className='g-4'>
                        {paginatedOperadoras.map((operadora) => (
                            <Col key={operadora.registro_ANS}>
                                <OperadoraCard
                                    operadora={operadora}
                                    onClick={handleOpenDetails}
                                />
                            </Col>
                        ))}
                    </Row>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav aria-label='Navegação de páginas' className='mt-4'>
                            <ul className='pagination justify-content-center'>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <Button
                                        variant='light'
                                        className='page-link'
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} /> Anterior
                                    </Button>
                                </li>

                                {renderPaginationItems()}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Button
                                        variant='light'
                                        className='page-link'
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        Próxima <ChevronRight size={16} />
                                    </Button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </>
            )}

            {/* Filtro lateral */}
            <OperadoraFilter
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
                modalidades={modalidades}
                applyFilters={applyFilters}
                modalidade={modalidade}
                setModalidade={setModalidade}
                uf={uf}
                setUf={setUf}
                cidade={cidade}
                setCidade={setCidade}
            />

            {/* Modal de detalhes */}
            {selectedOperadora && (
                <OperadoraDetails
                    operadora={selectedOperadora}
                    onClose={handleCloseDetails}
                />
            )}
        </Container>
    );
};

export default OperadoraList;