import { Modal, Row, Col, Button } from 'react-bootstrap';
import { Operadora } from '../../types/operadoras';
import { Building2, Calendar, Mail, MapPin, Phone, User } from 'lucide-react';

interface OperadoraDetailsProps {
    operadora: Operadora;
    onClose: () => void;
}

const OperadoraDetails = ({ operadora, onClose }: OperadoraDetailsProps) => {
    return (
        <Modal show={true} onHide={onClose} size='lg' centered>
            <Modal.Header>
                <Modal.Title>
                    <div>
                        <h5 className='mb-0'>{operadora.nome_fantasia}</h5>
                        <small className='text-muted'>{operadora.razao_social}</small>
                    </div>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col md={6}>
                        <h6 className='mb-3 border-bottom pb-2'>Informações Cadastrais</h6>
                        <div className='mb-3'>
                            <div className='d-flex mb-2'>
                                <Building2 size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Modalidade</div>
                                    <div>{operadora.modalidade}</div>
                                </div>
                            </div>

                            <div className='d-flex mb-2'>
                                <Calendar size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Registro ANS</div>
                                    <div>{operadora.registro_ANS}</div>
                                </div>
                            </div>

                            <div className='d-flex mb-2'>
                                <Building2 size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>CNPJ</div>
                                    <div>{operadora.cnpj}</div>
                                </div>
                            </div>

                            <div className='d-flex mb-2'>
                                <Calendar size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Data de Registro</div>
                                    <div>{operadora.data_registro_ANS}</div>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <h6 className='mb-3 border-bottom pb-2'>Endereço</h6>
                        <div className='d-flex'>
                            <MapPin size={16} className='me-2 text-muted mt-1' />
                            <div>
                                <p className='mb-1'>{operadora.logradouro}, {operadora.numero} {operadora.complemento}</p>
                                <p className='mb-1'>{operadora.bairro}</p>
                                <p className='mb-1'>{operadora.cidade} - {operadora.uf}, CEP {operadora.cep}</p>
                                <p className='small text-muted'>Região de Comercialização: {operadora.regiao_comercializacao}</p>
                            </div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <h6 className='mb-3 border-bottom pb-2'>Contato</h6>
                        {operadora.telefone && (
                            <div className='d-flex mb-2'>
                                <Phone size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Telefone</div>
                                    <div>({operadora.ddd}) {operadora.telefone}</div>
                                </div>
                            </div>
                        )}

                        {operadora.fax && (
                            <div className='d-flex mb-2'>
                                <Phone size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Fax</div>
                                    <div>({operadora.ddd}) {operadora.fax}</div>
                                </div>
                            </div>
                        )}

                        {operadora.endereco_eletronico && (
                            <div className='d-flex mb-2'>
                                <Mail size={16} className='me-2 text-muted mt-1' />
                                <div>
                                    <div className='small text-muted'>Email</div>
                                    <div>{operadora.endereco_eletronico}</div>
                                </div>
                            </div>
                        )}

                        <hr />

                        <h6 className='mb-3 border-bottom pb-2'>Representante</h6>
                        <div className='d-flex'>
                            <User size={16} className='me-2 text-muted mt-1' />
                            <div>
                                <div className='small text-muted'>Nome</div>
                                <div>{operadora.representante}</div>
                                <div className='small text-muted mt-2'>Cargo</div>
                                <div>{operadora.cargo_representante}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default OperadoraDetails;