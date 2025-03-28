import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Index() {
    return (
        <div className='container mx-auto px-4 py-5 d-flex flex-column align-items-center justify-content-center min-vh-100'>
            <div className='text-center' style={{ maxWidth: '800px' }}>
                <h1 className='display-4 fw-bold mb-4'>Sistema de Consulta de Operadoras de Saúde</h1>
                <p className='fs-5 text-muted mb-4'>
                    Bem-vindo ao sistema de consulta de operadoras de saúde. Utilize este sistema para pesquisar
                    e visualizar informações detalhadas sobre operadoras registradas na ANS.
                </p>
                <div className='d-flex flex-column flex-sm-row gap-3 justify-content-center'>
                    <Button as={Link} to='/operadoras' variant='primary' size='lg'>
                        Ver Operadoras
                    </Button>
                </div>
            </div>
        </div>
    );
}