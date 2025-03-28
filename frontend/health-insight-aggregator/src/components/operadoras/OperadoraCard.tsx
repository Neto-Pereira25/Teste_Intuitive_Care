import { Building2, MapPin, Phone } from 'lucide-react';
import { Button, Card } from 'react-bootstrap';
import { Operadora } from '../../types/operadoras';


interface OperadoraCardProps {
    operadora: Operadora;
    onClick: (operadora: Operadora) => void;
}

const OperadoraCard = ({ operadora, onClick }: OperadoraCardProps) => {
    return (
        <Card className='h-100 shadow-sm'>
            <Card.Body>
                <Card.Title className='fs-5 mb-1'>{operadora.nome_fantasia}</Card.Title>
                <Card.Subtitle className='mb-3 text-muted small'>{operadora.razao_social}</Card.Subtitle>

                <div className='mb-3'>
                    <div className='d-flex align-items-center mb-2'>
                        <Building2 size={16} className='me-2 text-muted' />
                        <span className='small'>{operadora.modalidade}</span>
                    </div>
                    <div className='d-flex align-items-center mb-2'>
                        <MapPin size={16} className='me-2 text-muted' />
                        <span className='small'>{operadora.cidade}, {operadora.uf}</span>
                    </div>
                    {operadora.telefone && (
                        <div className='d-flex align-items-center mb-2'>
                            <Phone size={16} className='me-2 text-muted' />
                            <span className='small'>({operadora.ddd}) {operadora.telefone}</span>
                        </div>
                    )}
                </div>

                <Button
                    variant='outline-primary'
                    className='w-100 mt-auto'
                    onClick={() => onClick(operadora)}
                >
                    Ver Detalhes
                </Button>
            </Card.Body>
        </Card>
    );
};

export default OperadoraCard;