import os
import pdfplumber
import pandas as pd
import zipfile

DOWNLOAD_FOLDER = 'data_files'
PDF_FILE = os.path.join(DOWNLOAD_FOLDER, 'Anexo_I_Rol_2021RN_465.2021_RN627L.2024.pdf')
CSV_FILE = 'data_file/rol_de_procedimentos.csv'
ZIP_FILE = 'data_file/Test_Jose_Pereira_da_Silva_Neto.zip'

SUBSTITUTIONS = {
    'OD': 'Seg. Odontológica',
    'AMB': 'Seg. Ambulatorial',
}

def extract_table(pdf_path: str) -> list:
    """ Extrai a tabela do pdf e retorna como um DataFrame do Pandas """
    data_table = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            tables = page.extract_table()
            if tables:
                for line in tables:
                    data_table.append(line)
    
    return data_table

if __name__ == '__main__':
    print(extract_table(PDF_FILE))