import { useState } from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

interface OperadoraFilterProps {
    isOpen: boolean;
    onClose: () => void;
    modalidades: string[];
    modalidade: string;
    setModalidade: (value: string) => void;
    applyFilters: () => void;
}


const OperadoraFilter = ({
    isOpen,
    onClose,
    modalidades,
    modalidade,
    setModalidade,
    applyFilters
}: OperadoraFilterProps) => {
    // Lista de UFs brasileiras
    const ufs = [
        'Todos', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
        'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ];

    const regioes = ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

    const [uf, setUf] = useState('Todos');
    const [regiao, setRegiao] = useState('Todas');
    const [cidade, setCidade] = useState('');

    // Função para aplicar os filtros e fechar o modal
    const handleApplyFilters = () => {
        applyFilters();
        onClose();
    };

    // Função para limpar os filtros
    const handleClearFilters = () => {
        setModalidade('Todas');
        setUf('Todos');
        setRegiao('Todas');
        setCidade('');
    };

    return (
        <Offcanvas show={isOpen} onHide={onClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filtros avançados</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Label>Modalidade</Form.Label>
                        <Form.Select
                            value={modalidade}
                            onChange={(e) => setModalidade(e.target.value)}
                        >
                            {modalidades.map((mod) => (
                                <option key={mod} value={mod}>{mod}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>UF</Form.Label>
                        <Form.Select
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                        >
                            {ufs.map((estado) => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Região</Form.Label>
                        <Form.Select
                            value={regiao}
                            onChange={(e) => setRegiao(e.target.value)}
                        >
                            {regioes.map((reg) => (
                                <option key={reg} value={reg}>{reg}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Cidade</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Digite o nome da cidade'
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                        />
                    </Form.Group>

                    <div className='d-grid gap-2 mt-4'>
                        <Button
                            variant='outline-secondary'
                            onClick={handleClearFilters}
                        >
                            Limpar Filtros
                        </Button>
                        <Button
                            variant='primary'
                            onClick={handleApplyFilters}
                        >
                            Aplicar Filtros
                        </Button>
                    </div>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default OperadoraFilter;