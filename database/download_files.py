import os
import requests
import zipfile

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

