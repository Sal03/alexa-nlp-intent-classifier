import requests

url = "https://91a7-24-35-90-216.ngrok-free.app/detect_intent"
payload = {"text": "I need help with my order"}

response = requests.post(url, json=payload)

print("Status:", response.status_code)
try:
    print("Response:", response.json())
except Exception as e:
    print("Raw Response Text:", response.text)
    print("Error decoding JSON:", e)
