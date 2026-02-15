from flask import Flask, request, jsonify
from flask_cors import CORS
from mail import send_email

app = Flask(__name__)
CORS(app)


@app.route("/contact", methods=["POST"])
def contact():

    try:

        data = request.json

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return jsonify({
                "status": "error",
                "message": "All fields are required"
            }), 400

        send_email(name, email, message)

        return jsonify({
            "status": "success",
            "message": "Email sent successfully"
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)