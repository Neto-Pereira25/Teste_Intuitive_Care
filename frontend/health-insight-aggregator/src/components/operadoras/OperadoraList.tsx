import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card } from 'react-bootstrap';
import { Search, Filter } from 'lucide-react';
import { toast } from 'react-toastify';
import { Operadora } from '../../types/operadoras';
import OperadoraCard from './OperadoraCard';
import OperadoraDetails from './OperadoraDetails';
import OperadoraFilter from './OperadoraFilter';
import { filtrarOperadoras, getModalidades, getOperadoras } from '../../services/operadorasService';

const OperadoraList = () => {
    const [operadoras, setOperadoras] = useState<Operadora[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOperadora, setSelectedOperadora] = useState<Operadora | null>(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalidade, setModalidade] = useState('Todas');
    const [modalidades, setModalidades] = useState<string[]>(['Todas']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOperadoras();
                setOperadoras(data);
                setModalidades(getModalidades());
            } catch (error) {
                toast.error('Erro ao carregar dados: Não foi possível carregar a lista de operadoras.');
                console.error('Erro ao buscar operadoras:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const filteredData = await filtrarOperadoras({
                termo: searchTerm,
                modalidade
            });
            setOperadoras(filteredData);
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
        setLoading(true);

        try {
            const data = await getOperadoras();
            setOperadoras(data);
        } catch (error) {
            toast.error('Erro ao redefinir: Não foi possível redefinir os filtros.');
            console.error(`Erro ao redefinir: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = async () => {
        await handleSearch();
        setFilterOpen(false);
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
            ) : (
                <Row xs={1} md={2} lg={3} className='g-4'>
                    {loading ? (
                        // Placeholders de carregamento
                        Array.from({ length: 6 }).map((_, index) => (
                            <Col key={index}>
                                <Card className='h-100 opacity-25'>
                                    <Card.Body>
                                        <div className='bg-secondary h-4 w-75 mb-2 rounded'></div>
                                        <div className='bg-secondary h-3 w-50 mb-4 rounded'></div>
                                        <div className='bg-secondary h-2 w-100 mb-2 rounded'></div>
                                        <div className='bg-secondary h-2 w-100 mb-2 rounded'></div>
                                        <div className='bg-secondary h-2 w-100 mb-2 rounded'></div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        operadoras.map((operadora) => (
                            <Col key={operadora.registro_ANS}>
                                <OperadoraCard
                                    operadora={operadora}
                                    onClick={handleOpenDetails}
                                />
                            </Col>
                        ))
                    )}
                </Row>
            )}

            {/* Filtro lateral */}
            <OperadoraFilter
                isOpen={filterOpen}
                onClose={() => setFilterOpen(false)}
                modalidades={modalidades}
                applyFilters={applyFilters}
                modalidade={modalidade}
                setModalidade={setModalidade}
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