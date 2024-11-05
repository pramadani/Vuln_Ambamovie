import requests

url = "http://localhost:3000/users/register"
data = {
    "username": "username_tes",
    "name": "name tes",
    "password": "tes123"
}

try:
    response = requests.post(url, json=data)
    
    if response.status_code == 201:
        print("Registrasi berhasil:", response.json())
    else:
        print("Gagal registrasi:", response.status_code, response.text)
except requests.exceptions.RequestException as e:
    print("Error:", e)
