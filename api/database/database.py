import psycopg2

def get_connection():
    try:
        conn = psycopg2.connect(
            database = 'ans_data',
            user='postgres',
            host='localhost',
            password='123456789',
            port=5432
        )
        
        return conn
    except Exception as e:
        raise e
        
if __name__ == '__main__':
    get_connection()