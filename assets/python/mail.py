import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL = os.environ.get("EMAIL_USER", "yourfavworker2019@gmail.com")
APP_PASSWORD = os.environ.get("EMAIL_PASS", "iaif lozb spcr cdei")


def send_email(name, sender_email, message):
    
    print(f"[MAIL] Attempting to send email from {name}...")
    print(f"[MAIL] Using email: {EMAIL}")
    print(f"[MAIL] App password set: {bool(APP_PASSWORD)}")

    msg = MIMEMultipart()

    msg["Subject"] = f"Portfolio Contact from {name}"
    msg["From"] = EMAIL
    msg["To"] = EMAIL

    body = f"""
New contact form message (Aditya's Portfolio)

Name: {name}
Email: {sender_email}

Message:
{message}
"""

    msg.attach(MIMEText(body, "plain"))

    try:
        print("[MAIL] Connecting to Gmail SMTP...")
        server = smtplib.SMTP("smtp.gmail.com", 587, timeout=30)
        
        print("[MAIL] Starting TLS...")
        server.starttls()

        print("[MAIL] Logging in...")
        server.login(EMAIL, APP_PASSWORD)

        print("[MAIL] Sending message...")
        server.send_message(msg)

        print("[MAIL] Closing connection...")
        server.quit()
        
        print("[MAIL] ✅ Email sent successfully!")
        return True
        
    except Exception as e:
        print(f"[MAIL ERROR] ❌ {e}")
        import traceback
        traceback.print_exc()
        raise