import { Operadora } from '../types/operadoras';

// Dados mockados para testes iniciais
const mockOperadoras: Operadora[] = [
    {
        registro_ANS: '123456',
        cnpj: '12.345.678/0001-90',
        razao_social: 'OPERADORA DE SAÚDE EXEMPLO S.A.',
        nome_fantasia: 'SAÚDE EXEMPLO',
        modalidade: 'Cooperativa Médica',
        logradouro: 'Avenida Principal',
        numero: '1000',
        complemento: 'Torre A, 10º andar',
        bairro: 'Centro',
        cidade: 'São Paulo',
        uf: 'SP',
        cep: '01000-000',
        ddd: '11',
        telefone: '3333-4444',
        fax: '3333-5555',
        endereco_eletronico: 'contato@saudeexemplo.com.br',
        representante: 'João Silva',
        cargo_representante: 'Diretor Executivo',
        regiao_comercializacao: 'Sudeste',
        data_registro_ANS: '01/01/2000'
    },
    {
        registro_ANS: '654321',
        cnpj: '98.765.432/0001-21',
        razao_social: 'PLANO DE SAÚDE BOA VIDA LTDA',
        nome_fantasia: 'BOA VIDA SAÚDE',
        modalidade: 'Medicina de Grupo',
        logradouro: 'Rua Secundária',
        numero: '500',
        complemento: 'Sala 101',
        bairro: 'Jardins',
        cidade: 'Rio de Janeiro',
        uf: 'RJ',
        cep: '20000-000',
        ddd: '21',
        telefone: '2222-3333',
        fax: '2222-4444',
        endereco_eletronico: 'contato@boavidasaude.com.br',
        representante: 'Maria Oliveira',
        cargo_representante: 'Presidente',
        regiao_comercializacao: 'Sudeste',
        data_registro_ANS: '15/03/2005'
    },
    {
        registro_ANS: '789012',
        cnpj: '45.678.901/0001-23',
        razao_social: 'ASSISTÊNCIA MÉDICA NORTE SUL S.A.',
        nome_fantasia: 'NORTE SUL SAÚDE',
        modalidade: 'Seguradora Especializada em Saúde',
        logradouro: 'Alameda dos Anjos',
        numero: '250',
        complemento: 'Bloco B',
        bairro: 'Boa Vista',
        cidade: 'Belo Horizonte',
        uf: 'MG',
        cep: '30000-000',
        ddd: '31',
        telefone: '4444-5555',
        fax: '4444-6666',
        endereco_eletronico: 'contato@nortesulsaude.com.br',
        representante: 'Carlos Pereira',
        cargo_representante: 'Diretor Comercial',
        regiao_comercializacao: 'Sudeste',
        data_registro_ANS: '22/07/2010'
    },
    {
        registro_ANS: '345678',
        cnpj: '78.901.234/0001-56',
        razao_social: 'COOPERATIVA DE SAÚDE DO NORDESTE',
        nome_fantasia: 'SAÚDE NORDESTE',
        modalidade: 'Cooperativa Médica',
        logradouro: 'Avenida Atlântica',
        numero: '789',
        complemento: '',
        bairro: 'Praia',
        cidade: 'Recife',
        uf: 'PE',
        cep: '50000-000',
        ddd: '81',
        telefone: '3131-4242',
        fax: '3131-4343',
        endereco_eletronico: 'atendimento@saudenordeste.com.br',
        representante: 'Ana Souza',
        cargo_representante: 'Diretora Geral',
        regiao_comercializacao: 'Nordeste',
        data_registro_ANS: '10/11/2008'
    },
    {
        registro_ANS: '901234',
        cnpj: '23.456.789/0001-87',
        razao_social: 'GRUPO HOSPITALAR SUL BRASIL S.A.',
        nome_fantasia: 'SUL BRASIL SAÚDE',
        modalidade: 'Autogestão',
        logradouro: 'Rua das Flores',
        numero: '333',
        complemento: 'Andar 5',
        bairro: 'Centro',
        cidade: 'Porto Alegre',
        uf: 'RS',
        cep: '90000-000',
        ddd: '51',
        telefone: '5555-6666',
        fax: '5555-7777',
        endereco_eletronico: 'contato@sulbrasilsaude.com.br',
        representante: 'Roberto Martins',
        cargo_representante: 'Superintendente',
        regiao_comercializacao: 'Sul',
        data_registro_ANS: '05/06/2003'
    }
];

// Função para buscar todas as operadoras
export async function getOperadoras(): Promise<Operadora[]> {
    // Simula uma chamada de API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockOperadoras);
        }, 500);
    });
}

// Função para buscar uma operadora pelo registro ANS
export async function getOperadoraByRegistro(registro: string): Promise<Operadora | undefined> {
    // Simula uma chamada de API
    return new Promise((resolve) => {
        setTimeout(() => {
            const operadora = mockOperadoras.find(op => op.registro_ANS === registro);
            resolve(operadora);
        }, 300);
    });
}

// Função para filtrar operadoras por vários critérios
export async function filtrarOperadoras(filtros: {
    termo?: string;
    modalidade?: string;
    uf?: string;
    regiao?: string;
}): Promise<Operadora[]> {
    // Simula uma chamada de API com filtros
    return new Promise((resolve) => {
        setTimeout(() => {
            let resultado = [...mockOperadoras];

            // Filtrar por termo de busca (razão social ou nome fantasia)
            if (filtros.termo) {
                const termoBusca = filtros.termo.toLowerCase();
                resultado = resultado.filter(
                    op => op.razao_social.toLowerCase().includes(termoBusca) ||
                        op.nome_fantasia.toLowerCase().includes(termoBusca)
                );
            }

            // Filtrar por modalidade
            if (filtros.modalidade && filtros.modalidade !== 'Todas') {
                resultado = resultado.filter(op => op.modalidade === filtros.modalidade);
            }

            // Filtrar por UF
            if (filtros.uf && filtros.uf !== 'Todos') {
                resultado = resultado.filter(op => op.uf === filtros.uf);
            }

            // Filtrar por região
            if (filtros.regiao && filtros.regiao !== 'Todas') {
                resultado = resultado.filter(op => op.regiao_comercializacao === filtros.regiao);
            }

            resolve(resultado);
        }, 500);
    });
}

// Retorna todas as modalidades disponíveis
export function getModalidades(): string[] {
    const modalidades = new Set<string>();
    mockOperadoras.forEach(op => modalidades.add(op.modalidade));
    return ['Todas', ...Array.from(modalidades)];
}