from flask import Flask, request, jsonify
from flask_cors import CORS
from mail import send_email

app = Flask(__name__)
CORS(app)


@app.route("/contact", methods=["POST"])
def contact():

    try:

        data = request.json

        name = data["name"]
        email = data["email"]
        message = data["message"]

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


if __name__ == "__main__":
    app.run(debug=True)