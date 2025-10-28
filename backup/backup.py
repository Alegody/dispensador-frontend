import os
import boto3
import psycopg2
import subprocess
from datetime import datetime

# Configuración de la base de datos
DB_HOST = os.getenv('DATABASE_HOST', 'coordinator')
DB_PORT = os.getenv('DATABASE_PORT', '5432')
DB_USER = os.getenv('DATABASE_USER', 'postgres')
DB_PASSWORD = os.getenv('DATABASE_PASSWORD', 'mysecretpassword')
DB_NAME = os.getenv('DATABASE_NAME', 'mydatabase')

# Configuración de AWS S3
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_S3_BUCKET = os.getenv('AWS_S3_BUCKET')
AWS_REGION = os.getenv('AWS_REGION', 'us-east-1')

BACKUP_DIR = '/backup'
DATE = datetime.now().strftime('%Y%m%d_%H%M%S')
BACKUP_FILE = f'db_backup_{DATE}.sql'
BACKUP_PATH = os.path.join(BACKUP_DIR, BACKUP_FILE)

os.makedirs(BACKUP_DIR, exist_ok=True)

# Realizar el backup con pg_dump
pg_dump_cmd = [
    'pg_dump',
    '-h', DB_HOST,
    '-p', DB_PORT,
    '-U', DB_USER,
    DB_NAME
]

env = os.environ.copy()
env['PGPASSWORD'] = DB_PASSWORD

with open(BACKUP_PATH, 'w') as f:
    subprocess.run(pg_dump_cmd, env=env, stdout=f, check=True)

print(f"Backup creado: {BACKUP_PATH}")

# Subir a S3
if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and AWS_S3_BUCKET:
    s3 = boto3.client(
        's3',
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_REGION
    )
    s3.upload_file(BACKUP_PATH, AWS_S3_BUCKET, BACKUP_FILE)
    print(f"Backup subido a S3: s3://{AWS_S3_BUCKET}/{BACKUP_FILE}")
else:
    print("No se configuró AWS S3, backup solo local.")
