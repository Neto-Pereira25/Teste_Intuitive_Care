import { ArrowLeft } from 'lucide-react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OperadoraList from '../components/operadoras/OperadoraList';

export default function Operadoras() {
    return (
        <div className='min-vh-100 d-flex flex-column'>
            <header className='border-bottom'>
                <Container>
                    <div className='d-flex align-items-center justify-content-between py-3'>
                        <Link to='/' className='d-flex align-items-center gap-2 text-decoration-none text-muted'>
                            <ArrowLeft size={16} />
                            <span>Voltar</span>
                        </Link>
                        <h1 className='h4 fw-semibold m-0'>Sistema de Consulta ANS</h1>
                        <div style={{ width: '5rem' }}></div> {/* Spacer para centralizar o título */}
                    </div>
                </Container>
            </header>

            <main className='flex-grow-1'>
                <OperadoraList />
            </main>

            <footer className='border-top mt-4'>
                <Container>
                    <div className='py-3 text-center text-muted small'>
                        Sistema de Consulta de Operadoras de Saúde &copy; {new Date().getFullYear()}
                    </div>
                </Container>
            </footer>
        </div>
    );
}