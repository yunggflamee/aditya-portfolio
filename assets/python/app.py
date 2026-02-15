from flask import Flask, request, jsonify
from flask_cors import CORS
from mail import send_email
import threading

app = Flask(__name__)
CORS(app)


def send_email_async(name, email, message):
    """Send email in background thread"""
    print(f"[THREAD] Starting email send for {name}")
    try:
        result = send_email(name, email, message)
        print(f"[THREAD] Email sent successfully from {name}")
    except Exception as e:
        print(f"[THREAD ERROR] Email sending failed: {e}")
        import traceback
        traceback.print_exc()


@app.route("/contact", methods=["POST"])
def contact():

    try:
        print("[ROUTE] Contact endpoint hit")
        
        data = request.json
        print(f"[ROUTE] Received data: {data}")

        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            print("[ROUTE] Missing required fields")
            return jsonify({
                "status": "error",
                "message": "All fields are required"
            }), 400

        print(f"[ROUTE] Creating thread to send email from {name}")
        # Send email in background thread
        thread = threading.Thread(
            target=send_email_async,
            args=(name, email, message)
        )
        thread.daemon = True
        thread.start()
        print("[ROUTE] Thread started")

        # Respond immediately without waiting
        return jsonify({
            "status": "success",
            "message": "Email sent successfully"
        })

    except Exception as e:
        print(f"[ROUTE ERROR] {e}")
        import traceback
        traceback.print_exc()
        
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)