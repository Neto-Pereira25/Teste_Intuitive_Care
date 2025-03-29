import os
import requests
import zipfile
import pandas as pd
import datetime

CURRENT_YEAR = datetime.datetime.now().year
DOWNLOAD_FOLDER = 'data_files/database_files'
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

URLS = {
    'operadoras_ativas': 'https://dadosabertos.ans.gov.br/FTP/PDA/operadoras_de_plano_de_saude_ativas/Relatorio_cadop.csv',
    f'demonstrativos_{CURRENT_YEAR - 2}': [
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 2}/1T{CURRENT_YEAR - 2}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 2}/2T{CURRENT_YEAR - 2}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 2}/3T{CURRENT_YEAR - 2}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 2}/4T{CURRENT_YEAR - 2}.zip',
    ],
    f'demonstrativos_{CURRENT_YEAR - 1}': [
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 1}/1T{CURRENT_YEAR - 1}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 1}/2T{CURRENT_YEAR - 1}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 1}/3T{CURRENT_YEAR - 1}.zip',
        f'https://dadosabertos.ans.gov.br/FTP/PDA/demonstracoes_contabeis/{CURRENT_YEAR - 1}/4T{CURRENT_YEAR - 1}.zip',
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

