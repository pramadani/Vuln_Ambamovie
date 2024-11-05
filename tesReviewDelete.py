import requests

url = "http://localhost:3000/reviews"
data = {
    "user": "34573fc6-d9e2-4462-b1af-e9576ed1a244",
    "movie": "8848c96d-0f49-4b0a-b760-b138c1a10453",
}

try:
    response = requests.delete(url, json=data)
    
    if response.status_code == 201:
        print("Registrasi berhasil:", response.json())
    else:
        print("Gagal registrasi:", response.status_code, response.text)
except requests.exceptions.RequestException as e:
    print("Error:", e)
