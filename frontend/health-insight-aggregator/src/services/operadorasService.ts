import axios from 'axios';
import { Operadora } from '../types/operadoras';

// Função para buscar todas as operadoras
export async function getOperadoras(): Promise<Operadora[]> {
    try {
        const response = await axios.get('http://127.0.0.1:8000/operadoras');
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Função para buscar uma operadora pelo registro ANS
export async function getOperadoraByRegistro(registro: string): Promise<Operadora | undefined> {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/operadoras/${registro}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

// Função para filtrar operadoras por vários critérios
export async function filterOperadoras(filtros: {
    termo?: string;
    modalidade?: string;
    uf?: string;
    cidade?: string;
}): Promise<Operadora[]> {
    try {
        const response = await axios.post('http://127.0.0.1:8000/operadoras/filtrar', filtros, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Retorna todas as modalidades disponíveis
export async function getModalidades(): Promise<string[]> {
    const modalidades = new Set<string>();
    const modalidadeList = await getOperadoras();
    modalidadeList.forEach(op => modalidades.add(op.modalidade))
    // mockOperadoras.forEach(op => modalidades.add(op.modalidade));
    return ['Todas', ...Array.from(modalidades)];
}