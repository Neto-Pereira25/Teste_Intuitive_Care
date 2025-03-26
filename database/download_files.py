import os
import requests
import zipfile
import pandas as pd

DOWNLOAD_FOLDER = 'data_files/database_files'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

URLS = {
    'operadoras_ativas': 'https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/Relatorio_cadop.csv',
    'demonstrativos_2023': [
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2023/1T2023.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2023/2T2023.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2023/3T2023.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2023/4T2023.zip',
    ],
    'demonstrativos_2024': [
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2024/1T2024.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2024/2T2024.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2024/3T2024.zip',
        'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/2024/4T2024.zip',
    ]
}

def download_file(url, destination):
    ''' Baixa um arquivo com barra de progresso. '''
    try:
        response = requests.get(url, stream=True)
        total_size = int(response.headers.get('content-length', 0))

        with open(destination, 'wb') as file:
            for data in response.iter_content(chunk_size=1024):
                file.write(data)
        
        print(f'✔ Arquivo baixado: {destination}')
    except Exception as e:
        print(e)

def extract_zip(zip_file, path_destination):
    ''' Extrai um arquivo ZIP para a pasta de destino. '''

    with zipfile.ZipFile(zip_file, 'r') as zip_ref:
        zip_ref.extractall(path_destination)
    print(f'✔ Arquivo extraído: {zip_file} → {path_destination}')

def listing_files(foulder):
    ''' Lista todos os arquivos na pasta de downloads. '''
    list_path_files = []
    print('\nArquivos extraídos')
    for root, dirs, files in os.walk(foulder):
        for file in files:
            print(f'- {os.path.join(root, file)}')
            list_path_files.append(os.path.join(root, file))
    return list_path_files


def verify_csv_file(path_csv, rows=5):
    ''' Exibe as primeiras linhas de um arquivo CSV '''
    print(f'\nAnalisando: {path_csv}...')
    try:
        df = pd.read_csv(path_csv, encoding='utf-8', delimiter=';')
        
        if 'VL_SALDO_INICIAL' in df.columns or 'VL_SALDO_FINAL' in df.columns:
            # Substituir vírgula por pontos nas colunas numéricas
            df['VL_SALDO_INICIAL'] = df['VL_SALDO_INICIAL'].astype(str).str.replace(',', '.')
            df['VL_SALDO_FINAL'] = df['VL_SALDO_FINAL'].astype(str).str.replace(',', '.')
        
        if 'Telefone' in df.columns:
            print('Birigui')
            df['Telefone'] = df['Telefone'].apply(lambda x: str(x)[:20])
            
        
        print(df.head(rows))
        return df
    except Exception as e:
        print(f'Erro ao abrir {path_csv}: {e}')

if __name__ == '__main__':
    print()
    # Baixar todos os arquivos
    for name, url in URLS.items():

        if isinstance(url, list):
            for i, sub_url in enumerate(url):
                path_destination = os.path.join(DOWNLOAD_FOLDER, f'{name}_{i+1}T.zip')
                download_file(sub_url, path_destination)
        else:
            path_destination = os.path.join(DOWNLOAD_FOLDER, f'{name}.csv')
            download_file(url, path_destination)
    
    # Extrair arquivos ZIP
    for name in [
        'demonstrativos_2023_1T', 
        'demonstrativos_2023_2T', 
        'demonstrativos_2023_3T', 
        'demonstrativos_2023_4T', 
        'demonstrativos_2024_1T',
        'demonstrativos_2024_2T',
        'demonstrativos_2024_3T',
        'demonstrativos_2024_4T'
        ]:
        zip_path = os.path.join(DOWNLOAD_FOLDER, f'{name}.zip')
        print(zip_path)
        if os.path.exists(zip_path):
            extract_zip(zip_path, DOWNLOAD_FOLDER)
    
    # Listando os arquivos extraídos
    list = listing_files(DOWNLOAD_FOLDER)
    
    for file in list:
        if os.path.exists(file):
            if '.zip' in file:
                continue
            df = verify_csv_file(file)
            df.to_csv(file, index=False, encoding='utf-8', sep=';')
        else:
            print(f'Arquivo não foi encontrado: {file}')

