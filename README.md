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


MIT License

Copyright (c) 2025 Saloni Angre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
