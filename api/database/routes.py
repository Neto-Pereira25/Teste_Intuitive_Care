import uvicorn, warnings

from http import HTTPStatus

from fastapi import FastAPI, Request, Body
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse
from typing import List
from pydantic import BaseModel
from database import get_connection
from psycopg2.extras import RealDictCursor

app = FastAPI()

app.add_middleware(GZipMiddleware)
app.add_middleware(CORSMiddleware, allow_origins = ["*"], allow_methods = ["*"], allow_headers = ["*"], expose_headers = ["*"], allow_credentials = True)

class Operadora(BaseModel):
    id: int
    registro_ANS: str
    cnpj: str
    razao_social: str
    nome_fantasia: str
    modalidade: str
    logradouro: str
    numero: str
    complemento: str
    bairro: str
    cidade: str
    uf: str
    cep: str
    ddd: str
    telefone: str
    fax: str
    endereco_eletronico: str
    representante: str
    cargo_representante: str
    regiao_comercializacao: str
    data_registro_ANS: str

class FilterRequest(BaseModel):
    termo: str
    modalidade: str
    uf: str
    cidade: str

@app.get('/operadoras', response_model=List[Operadora])
async def list_operadoras():
    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query: str = '''
            SELECT * FROM operadoras
        '''
        
        cursor.execute(query)
        operadoras = cursor.fetchall()

        cursor.close()
        conn.close()
        
        return JSONResponse(jsonable_encoder(operadoras), status_code=HTTPStatus.OK)
    except Exception as e:
        print(e)
        return JSONResponse(jsonable_encoder({"message": "Internal Server Error"}), status_code = HTTPStatus.INTERNAL_SERVER_ERROR)


@app.get('/operadoras/{registro_ans}', response_model = Operadora)
async def find_operadora_by_registro_ans(registro_ans: str):
    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query: str = '''
            SELECT * 
            FROM operadoras
            WHERE registro_ans LIKE %s
        '''
        
        cursor.execute(query, (registro_ans,))
        operadora = cursor.fetchone()

        cursor.close()
        conn.close()
        
        if operadora is None:
            return JSONResponse(jsonable_encoder({'operadora':'NOT FOUND'}), status_code=HTTPStatus.NOT_FOUND)
        
        return JSONResponse(jsonable_encoder(operadora), status_code=HTTPStatus.OK)
    except Exception as e:
        print(e)
        return JSONResponse(jsonable_encoder({"message": "Internal Server Error"}), status_code = HTTPStatus.INTERNAL_SERVER_ERROR)
    
@app.post("/operadoras/filtrar", response_model=List[Operadora])
async def filter_operadoras(filter: FilterRequest):
    try:
        conn = get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        query: str = '''
            SELECT * FROM operadoras
            WHERE 
                (razao_social LIKE %s or nome_fantasia LIKE %s) AND
                modalidade LIKE %s AND
                uf LIKE %s AND
                cidade LIKE %s
        '''
        
        if filter.modalidade.lower() == 'todas':
            filter.modalidade = ''
        
        if filter.uf.lower() == 'todos':
            filter.uf = ''
        
        cursor.execute(query, (
            f'%{filter.termo.upper()}%', 
            f'%{filter.termo.upper()}%', 
            f'%{filter.modalidade}%', 
            f'%{filter.uf}%', 
            f'%{filter.cidade}%'
            ))
        operadoras = cursor.fetchall()

        cursor.close()
        conn.close()
        
        return JSONResponse(jsonable_encoder(operadoras), status_code=HTTPStatus.OK)
    except Exception as e:
        print(e)
        return JSONResponse(jsonable_encoder({"message": "Internal Server Error"}), status_code = HTTPStatus.INTERNAL_SERVER_ERROR)