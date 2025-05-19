from flask import Flask, request, jsonify

app = Flask(__name__)  # ✅ Define app BEFORE using it

@app.route('/', methods=['POST'])
def alexa_handler():
    data = request.get_json(force=True)
    print("Alexa Request:", data)

    try:
        intent_name = data['request']['intent']['name']
    except KeyError:
        intent_name = "UnknownIntent"

    labels = ["get_product", "ask_offer", "track_order", "ask_help"]
    mapped_intent = {
        "GetProductIntent": "get_product",
        "TrackOrderIntent": "track_order",
        "GetHelpIntent": "ask_help",
        "HelpIntent": "ask_help",
    }

    top_intent = mapped_intent.get(intent_name, "ask_help")

    return jsonify({
        "version": "1.0",
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": f"Your intent is {top_intent}."
            },
            "shouldEndSession": False
        }
    })

if __name__ == '__main__':
    app.run(port=5050)
