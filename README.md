# Alexa NLP Intent Classifier

This project integrates a custom-built NLP intent classifier using Hugging Face Transformers with an Alexa Skill via Flask and Ngrok. It enables Alexa to understand open-ended user inputs like _"I need help with my order"_ and classify them into predefined intents such as `get_product`, `ask_offer`, `track_order`, and `ask_help`.

---

## 💡 Features

- 🔍 **Zero-Shot Classification** using `facebook/bart-large-mnli`
- 🧠 Understands natural language queries from Alexa
- 🔗 Integrated with Alexa Developer Console using HTTPS (Ngrok)
- ⚡ Lightweight Flask server for easy local development and testing

---

## 🧪 Demo

**Example Input to Alexa:**  
"I need help with my order"

**Classified Intent:**  
ask_help
