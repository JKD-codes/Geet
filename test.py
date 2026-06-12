import requests

url = "https://api.cobalt.tools/api/json"
payload = {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "isAudioOnly": True,
    "aFormat": "best"
}
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, json=payload, headers=headers)
    print(response.json())
except Exception as e:
    print(e)
