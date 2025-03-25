import os
import requests
import zipfile
from bs4 import BeautifulSoup


URL_ANS = 'https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos'

# Salvando os arquivos no diretório
DOWNLOAD_FOLDER = 'data_files'
ZIP_FILE = 'web_scraping/anexos.zip'

# Criando o diretório, caso ele não exista
os.makedirs(DOWNLOAD_FOLDER, exist_ok=True)

def dowload_pdf():
    """ Baixando os PDFs Anexo I e II da página da ANS. """
    try:
        response = requests.get(URL_ANS)

        if response.status_code != 200:
            print('Erro ao acessar a página')
            print(response)

        soup = BeautifulSoup(response.text, "html.parser")
        links = soup.find_all('a', href=True)

        pdf_links = []

        for link in links:
            href = link['href']
            if "Anexo_I" in href or "Anexo_II" in href:
                pdf_links.append(href)
        
        if not pdf_links:
            print('Nenhum PDF encontrado!')
            return
        
        for pdf_url in pdf_links:
            file_name = pdf_url.split('/')[-1]

            if '.pdf' in file_name:
                file_path = os.path.join(DOWNLOAD_FOLDER, file_name)
                
                pdf_response = requests.get(pdf_url, stream=True)

                with open(file_path, 'wb') as file:
                    for chunk in pdf_response.iter_content(chunk_size=1024):
                        file.write(chunk)
                
                print(f'{file_name} baixado com sucesso!')
    except Exception as e:
        print(e)



if __name__ == '__main__':
    dowload_pdf()