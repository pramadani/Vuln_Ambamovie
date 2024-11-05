import os
import requests
import psycopg2

# Konfigurasi database
db_config = {
    'dbname': 'moviedb',
    'user': 'user',
    'password': 'pass',
    'host': 'localhost',  # Ganti ini jika Anda menggunakan IP address
    'port': '5432'
}

# URL dasar untuk poster
base_url = 'https://image.tmdb.org/t/p/w500'

# Folder untuk menyimpan gambar poster
output_folder = './src/assets/images'

# Membuat folder jika belum ada
os.makedirs(output_folder, exist_ok=True)

def fetch_movies_from_db():
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        
        # Mengambil data film dari database
        cursor.execute("SELECT title, release_date, poster FROM movies;")
        movies = cursor.fetchall()  # Ambil semua data film
        
        return movies
    
    except Exception as e:
        print(f"Terjadi kesalahan saat mengambil data: {e}")
        return []
    
    finally:
        cursor.close()
        conn.close()

def download_poster(poster_path):
    # Gabungkan URL dasar dengan poster_path
    image_url = f"{base_url}{poster_path}"
    image_name = os.path.join(output_folder, poster_path.split('/')[-1])  # Dapatkan nama file dari path
    
    try:
        response = requests.get(image_url)
        response.raise_for_status()  # Memicu kesalahan untuk status kode 4xx/5xx
        
        # Simpan gambar
        with open(image_name, 'wb') as image_file:
            image_file.write(response.content)
        
        print(f"Gambar poster '{image_name}' berhasil diunduh.")
    
    except Exception as e:
        print(f"Terjadi kesalahan saat mengunduh {image_url}: {e}")

if __name__ == "__main__":
    movies = fetch_movies_from_db()
    
    if movies:
        for movie in movies:
            title, release_date, poster_path = movie
            
            if poster_path:  # Pastikan poster_path tidak None
                print(f"Men-download poster untuk film: {title}, Tanggal Rilis: {release_date}")
                download_poster(poster_path)
            else:
                print(f"Tidak ada poster untuk film: {title}")
    else:
        print("Tidak ada data film untuk diproses.")
