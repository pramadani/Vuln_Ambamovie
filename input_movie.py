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

# Fungsi untuk mengambil data film dari API
def fetch_movies(api_url):
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Memicu kesalahan untuk status kode 4xx/5xx
        data = response.json()  # Mengambil data JSON
        return data
    except Exception as e:
        print(f"Terjadi kesalahan saat mengambil data: {e}")
        return None

# Fungsi untuk menampilkan daftar film
def display_movies(movies):
    print("Daftar Film Populer:")
    for film in movies:
        title = film.get('title')
        overview = film.get('overview')
        release_date = film.get('release_date')
        language = film.get('original_language')  # Mengambil bahasa asli
        genres = film.get('genre_ids')  # Mengambil genre ID, jika ada
        poster_path = film.get('poster_path')  # Ambil poster_path
        
        print(f"Judul: {title}, Tanggal Rilis: {release_date}, Bahasa: {language}, Genre: {genres}, Poster: {poster_path}")
        print(f"Overview: {overview}")  # Menampilkan overview film

# Fungsi untuk menyimpan data film ke PostgreSQL
def save_movies_to_db(movies):
    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()
        
        insert_query = """
        INSERT INTO movies (title, overview, release_date, language, genres, poster) 
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        for film in movies:
            title = film.get('title')
            overview = film.get('overview')
            release_date = film.get('release_date')
            language = film.get('original_language')  # Mengambil bahasa asli
            genres = film.get('genre_ids')  # Mengambil genre ID, jika ada
            poster_path = film.get('poster_path')  # Ambil poster_path
            
            # Mengonversi genre ID ke string, jika diperlukan
            genres_string = [str(genre) for genre in genres] if genres else []
            
            print(f"Memasukkan film: {title}, Tanggal Rilis: {release_date}, Bahasa: {language}, Genre: {genres_string}, Poster: {poster_path}")  # Debug print
            
            if title and release_date:
                cursor.execute(insert_query, (title, overview, release_date, language, genres_string, poster_path))
            else:
                print("Data film tidak lengkap, tidak disimpan.")  # Debug print jika data tidak lengkap
        
        conn.commit()
        print("Data film berhasil disimpan.")
        
    except Exception as e:
        print(f"Terjadi kesalahan saat menyimpan data: {e}")
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    api_url = 'https://api.themoviedb.org/3/movie/popular?api_key=599fc20e9cec3e0900ad833ae5ea5ec4'  # Ganti dengan URL API Anda
    movies_data = fetch_movies(api_url)
    
    if movies_data and 'results' in movies_data:
        display_movies(movies_data['results'])  # Menampilkan daftar film
        save_movies_to_db(movies_data['results'])  # Menyimpan film ke database
    else:
        print("Tidak ada data film untuk ditampilkan.")
