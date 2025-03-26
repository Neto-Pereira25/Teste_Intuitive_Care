import os
import tabula
import pandas as pd
import zipfile

DOWNLOAD_FOLDER = "data_files"
PDF_FILE = os.path.join(DOWNLOAD_FOLDER, "Anexo_I_Rol_2021RN_465.2021_RN627L.2024.pdf")  # Nome do arquivo pode variar
CSV_FILE = "data_files/rol_de_procedimentos.csv"
ZIP_FILE = "data_files/Teste_JOSE_PEREIRA_DA_SILVA_NETO.zip"

SUBSTITUTIONS = {
    "OD": "Seg. Odontológica",
    "AMB": "Seg. Ambulatorial"
}

def extract_table(pdf_path):
    """ Extrai a tabela do PDF e retorna como um DataFrame do Pandas. """

    try:
        table_list = tabula.read_pdf(pdf_path, pages='3', multiple_tables=True)

        df = pd.concat(table_list, sort=False, ignore_index=True)
        return df
    except Exception as e:
        print(e)


def process_table(df):
    """ Converte a tabela extraída para um DataFrame e aplica transformações. """

    try:
        df.columns = df.columns.str.replace('\r', ' ').str.replace('\n', ' ')
        df = df.apply(lambda col: col.str.replace('\r', ' ').str.replace('\n', ' ') if col.dtype == 'object' else col)

        df.rename(columns=SUBSTITUTIONS, inplace=True)

        # for col in df.columns:
        #     df[col] = df[col].replace(SUBSTITUTIONS, regex=True)
        
        return df
    except Exception as e:
        print(e)

