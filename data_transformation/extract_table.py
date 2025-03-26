import os
import tabula
import pandas as pd
import zipfile

DOWNLOAD_FOLDER = 'data_files'
PDF_FILE = os.path.join(DOWNLOAD_FOLDER, 'Anexo_I_Rol_2021RN_465.2021_RN627L.2024.pdf')  # Nome do arquivo pode variar
CSV_FILE = 'data_files/rol_de_procedimentos.csv'
ZIP_FILE = 'data_files/Teste_JOSE_PEREIRA_DA_SILVA_NETO.zip'

SUBSTITUTIONS = {
    'OD': 'Seg. Odontológica',
    'AMB': 'Seg. Ambulatorial'
}

def extract_table(pdf_path):
    ''' Extrai a tabela do PDF e retorna como um DataFrame do Pandas. '''
    try:
        table_list = tabula.read_pdf(pdf_path, pages='3-181', multiple_tables=True)

        df = pd.concat(table_list, sort=False, ignore_index=True)
        return df
    except Exception as e:
        print(e)


def process_table(df):
    ''' Converte a tabela extraída para um DataFrame e aplica transformações. '''
    try:
        df.columns = df.columns.str.replace('\r', ' ').str.replace('\n', ' ')
        df = df.apply(lambda col: col.str.replace('\r', ' ').str.replace('\n', ' ') if col.dtype == 'object' else col)

        df.rename(columns=SUBSTITUTIONS, inplace=True)

        # for col in df.columns:
        #     df[col] = df[col].replace(SUBSTITUTIONS, regex=True)
        
        return df
    except Exception as e:
        print(e)

def save_csv(df, csv_path):
    ''' Salva o DataFrame em um arquivo CSV. '''
    try:
        # versão do pandas
        df.to_csv(csv_path, index=False, encoding='utf-8')
        # with open(csv_path, mode='w', newline='', encoding='utf-8') as file:
        #     writer = csv.writer(file)

        #     writer.writerow(df.columns)

        #     for row in df.values:
        #         writer.writerow(row)

        print(f'CSV salvo em {csv_path}')
        return
    except Exception as e:
        print(e)

def compact_csv_file(csv_path, zip_path):
    ''' Compacta o arquivo CSV gerado em um arquivo ZIP. '''
    try:
        with zipfile.ZipFile(zip_path, 'w') as zipf:
            zipf.write(csv_path, os.path.basename(csv_path))
        print(f'Arquivo ZIP salvo em {zip_path}')
    except Exception as e:
        print(e)

if __name__ == '__main__':
    if not os.path.exists(PDF_FILE):
        print(f'Arquivo PDF "{PDF_FILE}" não encontrado. Execute o scraper primeiro.')
    else:
        tables = extract_table(PDF_FILE)
        df = process_table(tables)
        save_csv(df, CSV_FILE)
        compact_csv_file(CSV_FILE, ZIP_FILE)