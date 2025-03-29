import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error('404 Error: O usuário tentou acessar uma rota inexistente:', location.pathname);
    }, [location.pathname]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='text-center'>
                <h1 className='text-4xl font-bold mb-4'>404</h1>
                <p className='text-xl text-gray-600 mb-4'>Oops! Página não encontrada</p>
                <div className='d-flex flex-column flex-sm-row gap-3 justify-content-center'>
                    <Button as={Link} to='/' variant='primary' size='lg'>
                        Retornar ao Início
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;